const router = require('express').Router();
const Task = require('../model/Task');
const User = require('../model/User');
const DailyUpdate = require('../model/DailyUpdate');

const auth = require('../auth/verifyLogin')
const validate = require('../validation/validation')
const Duration = require("duration");
const Moment = require('moment');

// for creating new task
router.post('/task', auth, async (req, res) => {


    // Check all value
    if (req.body.taskname == undefined || req.body.description == undefined || req.body.duration == undefined) { return res.status(400).send({ msg: "All Filed is Required" }) }
    //get current date and format 
    var currentDate = new Date();

    //get duration and format
    var durationDate = new Date(req.body.duration);

    //Length Check
    if (validate.lengthCheck(req.body.taskname, 3)) return res.status(400).send({ msg: 'taskname length min 3 required!!!' })
    if (validate.lengthCheck(req.body.description, 3)) return res.status(400).send({ msg: 'description length min 3 required!!!' })

    var duration = new Duration(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()),
        new Date(durationDate.getFullYear(), durationDate.getMonth() + 1, durationDate.getDate(), durationDate.getHours(), durationDate.getMinutes()));


    console.log(duration.days);
    if (duration.days < 0) return res.status(400).send({ msg: "Duration date and time is alredy passed!!!" })
    const task = new Task({
        ...req.body,
        createdBy: req.user._id,
        duration: req.body.duration
    });

    try {

        const checktask = await Task.find({ taskname: req.body.taskname })

        if (checktask.length != 0) {
            return res.status(400).send({ msg: "task is alredy created with same task name" })
        }
        const savedTask = await task.save();
        res.status(201).send({ msg: "Task Created successfully", savedTask });

    } catch (error) {
        res.status(400).send({ msg: "Task creation Failed!!!", error })
    }
});

//for updating task
router.patch('/task/:id', auth, async (req, res) => {


    if (req.body.taskname != undefined) if (validate.lengthCheck(req.body.taskname, 3)) return res.status(400).send({ msg: 'Taskname length min 3 required!!!' })
    if (req.body.description != undefined) if (validate.lengthCheck(req.body.description, 3)) return res.status(400).send({ msg: 'Task description length min 3 required!!!' })

    const checktask = await Task.find({ taskname: req.body.taskname, _id: { $ne: req.params.id } })

    if (checktask.length != 0) {
        return res.status(400).send({ msg: "task is alredy created with same task name" })
    }
    const updateTask = {
        ...req.body,
    }
    try {
        await Task.findOneAndUpdate({ _id: req.params.id, }, updateTask)
        const UpdatedTask = await Task.find({ _id: req.params.id })
        res.send(UpdatedTask)
    } catch (error) {
        res.send({ msg: "Task not Updated" })
    }

});

//deleting task
router.delete('/task/:taskId', auth, async (req, res) => {

    await Task.findOneAndDelete({ _id: req.params.taskId }, (err, task) => {
        if (err) return res.status(400).send({ error: err, msg: "task not found with this user" })
        Task.find({}, async (err, result) => {
            if (err) return res.status(400).send({ error: err, msg: "No Task found" })
            await User.updateMany({ task: req.params.taskId }, { task: null })
            return res.send(result)
        })
    })
})

//get userlist with no assigned perticular task
router.get('/userListTask/:taskId', auth, async (req, res) => {
    await User.find({ task: { $ne: req.params.taskId }, role: { $ne: 1 }, _id: { $ne: req.user._id } }, (err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })
        res.send(result)
    }).select({ "firstname": 1, "_id": 1, "lastname": 1, "role": 1, "designation": 1 })
})

//assigned task to user
router.patch('/task/:userId/:taskId', auth, async (req, res) => {


    console.log(req.body, req.params.userId, req.body.taskId);

    const updateTask = {
        task: req.body.taskId
    }
    try {
        await User.findOneAndUpdate({ _id: req.params.userId }, updateTask)
        const UpdatedTask = await User.find({ _id: req.params.userId })
        res.send(UpdatedTask)
    } catch (error) {
        res.send({ msg: "Task not Updated" })
    }

});

//task assigned user list
router.get('/assignedTask/:taskId', auth, async (req, res) => {
    await User.find({ task: req.params.taskId }, (err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })
        res.send(result)
    })
})

//get all task
router.get('/task', auth, async (req, res) => {
    await Task.find((err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })
        res.send(result)
    })
})

//get my task
router.get('/task/myTask', auth, async (req, res) => {
    const task = await User.findOne({ _id: req.user._id }, (err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })
    })
    // console.log(task.task);
    await Task.find({ _id: task.task }, (err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })

        res.send(result)
    })
})

//get user task 
router.get('/task/userTask/:userId', auth, async (req, res) => {
    const task = await User.findOne({ _id: req.params.userId }, (err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })
    })
    // console.log(task.task);
    await Task.findOne({ _id: task.task }, (err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })
        res.send(result)
    })
})


//daily update created
router.post('/dailyUpdate', auth, async (req, res) => {

    // Check all value
    if (req.body.task == undefined || req.body.content == undefined || req.body.hours == undefined) { return res.status(400).send({ msg: "All Filed is Required" }) }
    var now = new Date();

    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const checkDailyTask = await DailyUpdate.find({ createdAt: { $gte: startOfToday }, createdBy: req.user._id })
    if (checkDailyTask.length != 0) return res.status(400).send({ msg: "Today Update is alredy created" })
    const daily = new DailyUpdate({
        ...req.body,
        createdBy: req.user._id
    });

    try {
        const savedUpdate = await daily.save();
        res.status(201).send({ msg: "Task Created successfully", savedUpdate });

    } catch (error) {
        res.status(400).send({ msg: "Task creation Failed!!!", error })
    }
});

//get all update 
router.get('/dailyUpdate/:id', auth, async (req, res) => {
    await DailyUpdate.find({ createdBy: req.user._id, task: req.params.id }, (err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })

        res.send(result)
    })


})

module.exports = router;
