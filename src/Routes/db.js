const express = require("express");
const router = express.Router();
const Device = require("../models/Device");
const User = require("../models/User");
const request = require("request");

router.get("/devices", (req, res) => {
  for (let i = 100; i < 150; i++) {
    Device.create({
      nameDevice: "ABC" + Math.floor(Math.random() * 100 + i),
      status: "1",
      role: Math.floor(Math.random() * 2) + 1,
      stationId: Math.floor(Math.random() * 20),
    });
  }
  // .then((result) => {
  //     res.send('Đã thêm thành công')
  // })
  // .catch((err) => {
  //     res.send('Thêm DB thất bại')
  // });
});



const district = [
  "Hải Châu",
  "Thanh Khê",
  "Liên Chiểu",
  "Ngũ Hành Sơn",
  "Cẩm Lệ",
];
const ward = [
  ["Thanh Bình", "Thuận Phước", "Thạch Thang", "Hòa Thuận Tây"],
  ["Xuân Hà", "Tam Thuận", "Tân Chính", "Thạc Gián"],
  ["Hòa Khánh Nam", "Hòa Khánh Bắc", "Hòa Hiệp Nam", "Hòa Hiệp Bắc"],
  ["Hòa Hải", "Hòa Quý", "Khuê Mỹ", "Mỹ An"],
  ["Hòa An", "Hòa Phát", "Hòa Thọ Đông", "Hòa Thọ Tây"],
];

router.get("/stations", (req, res) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; i < 4; j++) {
      Device.create({ district: district[i], ward: ward[i][j], street: "122" });
    }
  }
});

//add user
router.post("/users", (req, res) => {
  User.create({ nameUser: "thinhnguyen12", password: "12345", role: "1" })
    .then((result) => {
      res.send("Đã thêm thành công");
    })
    .catch((err) => {
      res.send("Thêm DB thất bại");
    });
});

router.post("/testpost", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    var newUser = new User({
      username,
      password,
      role: "1",
    });
    await newUser.save();
    return res.status(200).json({ message: "da chay duoc" });
  } catch (err) {
    return res.status(500).json({ message: "deo on roi" });
  }
});


//hai chau: 16.0503  108.2191
//thanh khe : 16.0695, 108.1966
//lien chieu : 16.0974, 108.1393
//ngu hanh son : 16, 108.2643
//cam le : 16.0158, 108.2094

var lat =  16.0503
var lon = 108.2191
router.get("/weather", (req, res) => {
  let city = req.query.city;
  request(
    "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=f96e9af59e72f23e0182dcf7d45aa367",
    function (error, response, body) {
      let data = JSON.parse(body);
      if (response.statusCode === 200) {
        res.send(data);
      }
    }
  );
});
module.exports = router;
