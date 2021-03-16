const router = require('express').Router();
const Task = require('../model/Task');
const auth = require('../auth/verifyLogin')
const validate = require('../validation/validation')
const Duration = require("duration");
const Moment = require('moment');

// for creating new task
router.post('/task', auth, async (req, res) => {

    // Check all value
    if (req.body.taskname == undefined || req.body.description == undefined || req.body.duration == undefined) { return res.status(400).send({ error: "All Filed is Required" }) }
    //get current date and format 

    var currentDate = new Date();

    //get duration and format
    var durationDate = new Date(Moment(req.body.duration).format('YYYY-MM-DD'));

    //Length Check
    if (validate.lengthCheck(req.body.taskname, 3)) return res.status(400).send({ msg: 'taskname length min 6 required!!!' })
    if (validate.lengthCheck(req.body.description, 3)) return res.status(400).send({ msg: 'description length min 3 required!!!' })

    var duration = new Duration(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()),
        new Date(durationDate.getFullYear(), durationDate.getMonth() + 1, durationDate.getDate()));
    const task = new Task({
        ...req.body,
        createdBy: req.user._id,
        duration: duration.hours
    });

    try {
        const savedTask = await task.save();
        res.status(201).send({ msg: "Task Created successfully", savedTask });

    } catch (error) {
        res.status(400).send({ msg: "Task creation Failed!!!", error })
    }
});

//for updating task
router.patch('/task/:id', auth, async (req, res) => {

    var taskResult = {}
    await Task.findOne({ _id: req.params.id, createdBy: req.user._id }, (err, task) => {
        if (err) return res.status(400).send({ error: err, msg: "task not found" })
        taskResult = task;

    })

    if (req.body.taskname != undefined) if (validate.lengthCheck(req.body.taskname, 3)) return res.status(400).send({ error: 'Taskname length min 3 required!!!' })
    if (req.body.description != undefined) if (validate.lengthCheck(req.body.description, 3)) return res.status(400).send({ error: 'Task description length min 3 required!!!' })

    const updateTask = {
        ...req.body,

    }
    if (req.body.duration != undefined) {
        var currentDate = new Date();
        var durationDate = new Date(Moment(req.body.duration).format('YYYY-MM-DD'));

        var duration = new Duration(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()),
            new Date(durationDate.getFullYear(), durationDate.getMonth() + 1, durationDate.getDate()));
        const updateTask = {
            ...req.body,
            duration: parseInt(taskResult.duration) + parseInt(duration.hours)
        }
    }

    try {
        await Task.findOneAndUpdate({ _id: req.params.id, }, updateTask)
        const UpdatedTask = await Task.find({ _id: req.params.id })
        res.send(UpdatedTask)
    } catch (error) {
        res.send({ error: "Task not Updated" })
    }

});

//deleting task
router.delete('/task/:taskId', auth, async (req, res) => {
    await Task.findOne({ _id: req.params.taskId, createdBy: req.user._taskId }, (err, task) => {
        if (err) return res.status(400).send({ error: err, msg: "task not found with this user" })
    })
    Task.findByIdAndDelete(req.params.taskId, (err, task) => {
        if (err) return res.status(400).send({ error: err, msg: "task not found with this user" })
        res.send({ msg: "task deleted successfully" })
    })
})

//get all task
router.get('/task', auth, async (req, res) => {
    await Task.find((err, result) => {
        if (err) return res.status(400).send({ error: err, msg: "No Task found" })
        res.send(result)
    })
})
module.exports = router;
