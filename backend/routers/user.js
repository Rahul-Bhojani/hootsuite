const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validate = require('../validation/validation')
const auth = require('../auth/verifyLogin')

// for new staff registration
router.post('/register', async (req, res) => {


    //Check all value
    if (req.body.email == undefined || req.body.username == undefined || req.body.password == undefined || req.body.firstname == undefined || req.body.lastname == undefined) { return res.status(400).send({ error: "All Filed is Required" }) }

    //Email Format Check
    if (!validate.emailCheck(req.body.email)) return res.status(400).send({ msg: "Enter Correct Email Address!!!" })

    //Length Check
    if (validate.lengthCheck(req.body.password, 6)) return res.status(400).send({ msg: 'password length min 6 required!!!' })
    if (validate.lengthCheck(req.body.username, 3)) return res.status(400).send({ msg: 'Userame length min 3 required!!!' })
    if (validate.lengthCheck(req.body.firstname, 3)) return res.status(400).send({ msg: 'FirstName length min 3 required!!!' })
    if (validate.lengthCheck(req.body.lastname, 3)) return res.status(400).send({ msg: 'LastName length min 3 required!!!' })


    //Unique Email And User check
    const emailCheck = await User.findOne({ email: req.body.email.toLowerCase() })
    if (emailCheck) return res.status(400).send({ msg: 'Email id Alredy Exits!!!' })
    const UserCheck = await User.findOne({ username: req.body.username.toLowerCase() })
    if (UserCheck) return res.status(400).send({ msg: 'Username id Alredy Exits!!!' })

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);

    const user = new User({
        ...req.body,
        password: await bcrypt.hash(req.body.password, salt)
    });

    try {
        const savedUser = await user.save();
        res.status(201).send({ msg: "Registration Sucessfull", savedUser });

    } catch (error) {
        res.status(400).send({ msg: "Registration Failed!!!", error })
    }

});

// for login
router.post('/login', async (req, res) => {

    //Check all value
    if (req.body.username == undefined || req.body.password == undefined)
        return res.send({ msg: "All Filed is Required" })

    //Check User Details
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send({ msg: "Username Or Password not match!!!" })

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ msg: "username Or Password not match!!!" })


    const token = jwt.sign({ _id: user._id }, 'LanetDemoProject')

    //Set Auth token
    res.header('x-auth-token', token).send({ msg: "User Login Successfully!!", token })



});

// for authnticate current user
router.get('/auth', auth, (req, res) => {
    User.findOne({ _id: req.user }, (err, result) => {
        if (err) return res.status(400).send({ error: err })
        res.status(200).send(result)
    }).select('-password')

})

//update main details of profile i.e. firstname,lastname,username,email etc...
router.patch('/profile', auth, async (req, res) => {

    const _id = req.params.id


    if (req.body.firstname != undefined) if (validate.lengthCheck(req.body.firstname, 3)) return res.status(400).send({ error: 'FirstName length min 3 required!!!' })
    if (req.body.lastname != undefined) if (validate.lengthCheck(req.body.lastname, 3)) return res.status(400).send({ error: 'lastname length min 3 required!!!' })
    if (req.body.username != undefined) {
        if (validate.lengthCheck(req.body.username, 3)) {
            return res.status(400).send({ error: 'username length min 3 required!!!' })
        }
        const UserCheck = await User.findOne({ username: req.body.username.toLowerCase(), _id: { $ne: req.user._id } })
        if (UserCheck) return res.status(400).send({ msg: 'Username id Alredy Exits!!!' })

    }
    if (req.body.email != undefined) {
        if (validate.lengthCheck(req.body.email, 3)) {
            return res.status(400).send({ error: 'email length min 3 required!!!' })
        }
        const emailCheck = await User.findOne({ email: req.body.email, _id: { $ne: req.user._id } })
        if (emailCheck) return res.status(400).send({ msg: 'Email id Alredy Exits!!!' })
    }


    const updateUser = {
        ...req.body
    }

    try {
        await User.findOneAndUpdate({ _id: req.user._id }, updateUser)
        const UpdatedUser = await User.find({ _id: req.params.id })
        res.send(UpdatedUser)
    } catch (error) {
        res.send({ error: "user not Updated" })
    }

})

//get all registered user Details
router.get('/staff', auth, async (req, res) => {
    await User.find((err, result) => {
        if (err) return res.status(400).send({ error: err })
        res.send(result)
    }).select('-password')
})

//get profile details 
router.get('/myprofile', auth, async (req, res) => {
    try {

        const profile = await User.findOne({ _id: req.user._id })

        if (!profile) return res.status(400).send({ error: "No Profile" })
        res.status(200).send(profile)
    }
    catch (error) {
        res.status(400).send({ msg: "Can't get profile", error })
    }
})

// get profile by emailid
router.get('/profile/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (!user) return res.status(400).send({ error: "No user found" })
        res.status(200).send(user)
    }
    catch (error) {
        res.status(400).send({ msg: "Can't get profile", error })
    }
})

//create or update  profile details
router.post('/myprofile', auth, async (req, res) => {

    try {

        // console.log(req.user._id);

        const getProfile = await User.findOne({ _id: req.user._id })

        if (getProfile) {

            await User.findOneAndUpdate({ _id: req.user._id }, req.body)
            const getUpdatedProfile = await User.findOne({ _id: req.user._id })
            return res.status(200).send(getUpdatedProfile)
        }
        const profile = new Profile({
            ...req.body,
            user: req.user
        })

        await profile.save();
        res.status(200).send(profile)

    } catch (error) {
        res.status(400).send({ msg: "Can't update profile", error })
    }
})



module.exports = router;