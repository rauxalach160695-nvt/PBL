const express = require("express");
const router = express.Router();
const Device = require("../models/Device");
const User = require("../models/User");
const request = require("request");
const fs = require('fs');

function base64_encode(file) {
  console.log("here");
  // read binary data
  var bitmap = fs.readFileSync(file);
  console.log("123");
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

router.get("/image",async (req, res) => {
  
  try {
    // var base64str = base64_encode('ffxvi.png');
    // var imageAsBase64 = await fs.readFileSync('ffxvi.png', 'base64');
    // console.log(imageAsBase64)
    fs.readFileSync('doc.txt','utf8',function(error,data){
      console.log(typeof(data));
    })
    return res.status(200).json({ message: ok });
  } catch (err) {
    return res.status(500).json({ err });
  }
});



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

var lat = 16.0503;
var lon = 108.2191;
console.log(typeof lat);
router.get("/weather", (req, res) => {
  var listStation = [
    [16.0503, 108.2191],
    [16.0695, 108.1966],
    [16.0974, 108.1393],
    [16, 108.2643],
    [16, 108.2643],
  ];
  const { location } = req.body;
  var locationId;
  if (location == "HaiChau") {
    locationId = 0;
  } else if (location == "ThanhKhe") {
    locationId = 1;
  } else if (location == "LienChieu") {
    locationId = 2;
  } else if (location == "NguHanhSon") {
    locationId = 3;
  } else {
    locationId = 4;
  }
  var lat = listStation[locationId][0];
  var lon = listStation[locationId][1];
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
