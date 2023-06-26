const express = require("express");
const router = express.Router();
const { JWT_SECRET } = require("../config");
const User = require("../models/User");
const UserDetail = require("../models/UserDetail")
const JWT = require("jsonwebtoken");
const passport = require("passport");
const passportConfig = require("../middleware/passport")

const encodedToken = (userID) => {
  return JWT.sign(
    {
      iss: "ThinhNguyen",
      sub: userID,
      iat: new Date().getTime(),
      // expiresIn: '1h'
    },
    JWT_SECRET
  );
};

router.post("/signup", async (req, res) => {
  try {
    const { username, password, nameUser, phoneNumber, role} = req.body;

    //check if username exist
    const foundUser = await User.findOne({ username });
    console.log("found user", foundUser);
    if (foundUser)
      return res
        .status(403)
        .json({ error: { message: "Username is already in use" } });
    console.log(username, password);

    //create a new user
    var newUser = new User({
      username,
      password,
      role,
    });
    await newUser.save();
    console.log(newUser._id)

    //create a new UserDetail
    const userId = newUser._id
    var newUserDetail = new UserDetail({
      nameUser,
      phoneNumber,
      userId
    })
    await newUserDetail.save();

    //encoded a token
    const token = encodedToken(newUser._id)


    res.setHeader('Authorization', token)
    return res.status(200).json({ message: true })
  } catch (err) {
    return res.status(500).json({ message: err});
  }
});

router.get("/login",(passport.authenticate('local', {session: false})), (req, res) => {
    let token = encodedToken(req.user._id)
    res.setHeader('Authorization', token)
    return res.status(200).json({token})
    console.log("worked here")
  });

router.get("/secret",(passport.authenticate('jwt', {session: false})), (req, res) => {
    return res.status(200).json({ message: true })
  });

  router.get("/userId", (req, res) => {
    return res.status(200).json({ message: true })
  });




router.get("/worker", async (req, res) => {
  try {
    console.log("get worker")
    var listWorkerDetail =new Array();
    var listWorker = await User.find({ role: 2 })
    console.log(typeof(listWorker))
    for (i in listWorker){
      listWorkerDetail.push(await UserDetail.findOne({userId: listWorker[i]._id})) 
    }
    return res.status(200).json(listWorkerDetail);
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
});

router.get("/", (req, res) => {
  res.send("device here");
});



router.get("/getUser", async (req, res) => {
  try {
    const { userId, phoneNumber } =
      req.body;
    await UserDetail.findOneAndUpdate(
      { userId: userId },
      {
        phoneNumber : phoneNumber,
      }
    );

    return res.status(200).json({ message: "Cap nhap so dien thoai thanh cong" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});
router.put("/editPass", async (req, res) => {
  try {
    const { userId, phoneNumber } =
      req.body;
    await UserDetail.findOneAndUpdate(
      { userId: userId },
      {
        phoneNumber : phoneNumber,
      }
    );

    return res.status(200).json({ message: "Cap nhap so dien thoai thanh cong" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});

router.put("/editPhone", async (req, res) => {
  try {
    const { userId, phoneNumber } =
      req.body;
    await UserDetail.findOneAndUpdate(
      { userId: userId },
      {
        phoneNumber : phoneNumber,
      }
    );

    return res.status(200).json({ message: "Cap nhap so dien thoai thanh cong" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});

router.put("/editEmail", async (req, res) => {
  try {
    const { userId, email } =
      req.body;
    await UserDetail.findOneAndUpdate(
      { userId: userId },
      {
        email : email,
      }
    );

    return res.status(200).json({ message: "Cap nhap dia chi email thanh cong" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});
module.exports = router;
