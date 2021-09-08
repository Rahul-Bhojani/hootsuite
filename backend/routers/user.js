const router = require("express").Router();
const User = require("../model/User");
const Task = require("../model/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validate = require("../validation/validation");
const auth = require("../auth/verifyLogin");
const nodemailer = require("nodemailer");

// for new staff registration
router.post("/register", async (req, res) => {
  //Check all value
  console.log(req.body);
  if (
    req.body.email == undefined ||
    req.body.username == undefined ||
    req.body.role == undefined ||
    req.body.firstname == undefined ||
    req.body.lastname == undefined
  ) {
    return res.status(400).send({ msg: "All Filed is Required" });
  }
  //Email Format Check
  if (!validate.emailCheck(req.body.email))
    return res.status(400).send({ msg: "Enter Correct Email Address!!!" });
  //Length Check
  // if (validate.lengthCheck(req.body.password, 6)) return res.status(400).send({ msg: 'password length min 6 required!!!' })
  if (validate.lengthCheck(req.body.username, 3))
    return res.status(400).send({ msg: "Userame length min 3 required!!!" });
  if (validate.lengthCheck(req.body.firstname, 2))
    return res.status(400).send({ msg: "FirstName length min 2 required!!!" });
  if (validate.lengthCheck(req.body.lastname, 2))
    return res.status(400).send({ msg: "LastName length min 2 required!!!" });
  if (req.body.mobileno != undefined) {
    if (
      validate.NumberlengthCheck(req.body.mobileno, 10) ||
      isNaN(req.body.mobileno)
    )
      return res.status(400).send({ msg: "Enter valid Mobile Number" });
  }
  if (req.body.designation != undefined)
    if (validate.lengthCheck(req.body.designation, 2))
      return res
        .status(400)
        .send({ msg: "designation length min 2 required!!!" });

  //Unique Email And User check
  const emailCheck = await User.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (emailCheck)
    return res.status(400).send({ msg: "Email id Alredy Exits!!!" });
  const UserCheck = await User.findOne({
    username: req.body.username.toLowerCase(),
  });
  if (UserCheck)
    return res.status(400).send({ msg: "Username id Alredy Exits!!!" });
  //Encrypt Password
  const salt = await bcrypt.genSalt(10);
  let password = await Math.random().toString(36).substr(2, 8);
  
  console.log(password);
  const user = new User({
    ...req.body,
    mobileno: parseInt(req.body.mobileno),
    password: await bcrypt.hash(password, salt),
  });
  console.log(user);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info.ck.3764@gmail.com",
      pass: "886013564469",
    },
  });

  var mailOptions = {
    from: "info.ck.3764@gmail.com",
    to: req.body.email,
    subject: "Staff Login Credentials",
    html: `
        <hr>
        <p>Username : ${user.username}</p>
        <p>Password : ${password}</p>
        <hr>
        `,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ", info);
    }
  });
  try {
    const savedUser = await user.save();
    res.status(201).send({ msg: "Registration Sucessfull", savedUser });
  } catch (error) {
    res.status(400).send({ msg: "Registration Failed!!!", error });
  }
});

// for login
router.post("/login", async (req, res) => {
  //Check all value
  if (req.body.username == undefined || req.body.password == undefined)
    return res.send({ msg: "All Filed is Required" });

  //Check User Details
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).send({ msg: "username or password not match!!!" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send({ msg: "username or password not match!!!" });

  const token = jwt.sign({ _id: user._id }, "LanetDemoProject");

  //Set Auth token
  res
    .header("x-auth-token", token)
    .send({ msg: "User Login Successfully!!", token });
});

// for authnticate current user and get authnticated user data
router.get("/auth", auth, (req, res) => {
  User.findOne({ _id: req.user }, (err, profile) => {
    if (err) return res.status(400).send({ error: err });

    res.status(200).send(profile);
  }).select("-password");
});

//get all registered user Details
router.get("/staff", auth, async (req, res) => {
  await User.find((err, result) => {
    if (err) return res.status(400).send({ error: err });
    res.send(result);
  }).select("-password");
});

// get full profile details by userId
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    if (!user) return res.status(400).send({ error: "No user found" });

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ msg: "Can't get profile", error });
  }
});

//update  details of profile i.e. firstname,lastname,username,email etc...
router.patch("/profile", auth, async (req, res) => {
  if (req.body.firstname != undefined)
    if (validate.lengthCheck(req.body.firstname, 3))
      return res
        .status(400)
        .send({ msg: "FirstName length min 3 required!!!" });
  if (req.body.lastname != undefined)
    if (validate.lengthCheck(req.body.lastname, 3))
      return res.status(400).send({ msg: "lastname length min 3 required!!!" });
  if (req.body.officeno != undefined) {
    if (
      validate.NumberlengthCheck(req.body.officeno, 10) ||
      isNaN(req.body.officeno)
    )
      return res.status(400).send({ msg: "Enter valid Office Number" });
  }
  if (req.body.mobileno != undefined) {
    if (
      validate.NumberlengthCheck(req.body.mobileno, 10) ||
      isNaN(req.body.mobileno)
    )
      return res.status(400).send({ msg: "Enter valid Mobile Number" });
  }
  if (req.body.designation != undefined)
    if (validate.lengthCheck(req.body.designation, 2))
      return res
        .status(400)
        .send({ msg: "designation length min 2 required!!!" });
  if (req.body.address != undefined)
    if (validate.lengthCheck(req.body.address, 3))
      return res.status(400).send({ msg: "address length min 3 required!!!" });

  if (req.body.username != undefined) {
    if (validate.lengthCheck(req.body.username, 3)) {
      return res.status(400).send({ msg: "username length min 3 required!!!" });
    }
    const UserCheck = await User.findOne({
      username: req.body.username.toLowerCase(),
      _id: { $ne: req.user._id },
    });
    if (UserCheck)
      return res.status(400).send({ msg: "Username id Alredy Exits!!!" });
  }
  if (req.body.email != undefined) {
    if (validate.lengthCheck(req.body.email, 3)) {
      return res.status(400).send({ msg: "email length min 3 required!!!" });
    }
    const emailCheck = await User.findOne({
      email: req.body.email,
      _id: { $ne: req.user._id },
    });
    if (emailCheck)
      return res.status(400).send({ msg: "Email id Alredy Exits!!!" });
  }
  const updateUser = {
    ...req.body,
  };
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, updateUser);
    const updatedUser = await User.findOne({ _id: req.user._id });
    res.send(updatedUser);
  } catch (error) {
    res.send({ msg: "user not Updated" });
  }
});

//update password
router.patch("/password", auth, async (req, res) => {
  if (req.body.password != undefined) {
    if (validate.lengthCheck(req.body.password, 6)) {
      return res.status(400).send({ msg: "password length min 6 required!!!" });
    }
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send({ msg: "user not found!!!" });
    const validPass = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validPass) {
      return res.status(400).send({ msg: " Old password not valid!!!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const updatePassword = {
        password,
      };
      await User.findOneAndUpdate({ _id: req.user._id }, updatePassword);
      return res.status(200).send({ msg: "Password Change Successfully" });
    }
  }
});

//get count Details
//get all registered user Details
router.get("/count", async (req, res) => {
  const staffMember = await User.countDocuments({});
  const staffAdmin = await User.countDocuments({ role: { $eq: 1 } });
  const staffHr = await User.countDocuments({ role: { $eq: 2 } });
  const tasks = await Task.countDocuments({});
  const staffWithoutTask = await User.countDocuments({
    task: { $eq: null },
    role: { $ne: 1 },
  });
  res
    .status(200)
    .send({ staffMember, tasks, staffWithoutTask, staffAdmin, staffHr });
});

module.exports = router;
