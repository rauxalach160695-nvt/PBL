const express = require("express");
const router = express.Router();
const Device = require("../models/Device");
const User = require("../models/User");
const request = require("request");
const fs = require("fs");

function base64_encode(file) {
  console.log("here");
  // read binary data
  var bitmap = fs.readFileSync(file);
  console.log("123");
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

router.get("/image", async (req, res) => {
  try {
    // var base64str = base64_encode('ffxvi.png');
    // var imageAsBase64 = await fs.readFileSync('ffxvi.png', 'base64');
    // console.log(imageAsBase64)
    fs.readFileSync("doc.txt", "utf8", function (error, data) {
      console.log(typeof data);
    });
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

//núi đôi , soc son ,soc son:21.2573,105.85
//hồng hà, chương dương , hoan kiem : 21.0306, 105.8573
//DT87, yên bái, ba vì :21.0448, 105.4404
// ĐL Thăng Long, TT. Quốc Oai, Quốc Oai, Hà Nội, Việt Nam:21.0034, 105.6323
//Cổ Hoàng, Hoàng Long, Phú Xuyên, Hà Nội, Việt Nam :20.7627, 105.8318

//hai chau: 16.0503  108.2191
//thanh khe : 16.0695, 108.1966
//lien chieu : 16.0974, 108.1393
//ngu hanh son : 16, 108.2643
//cam le : 16.0158, 108.2094

// Trần Thị Triên, Nhuận Đức, Củ Chi, Thành phố Hồ Chí Minh, Việt Nam :11.0278, 106.4831
//163 Đ. Tây Hòa, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam :10.8266, 106.7609
// Đ. Trần Đại Nghĩa, Lê Minh Xuân, Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam :10.7576,106.5138
//Rừng Sác, An Thới Đông, Cần Giờ, Thành phố Hồ Chí Minh, Việt Nam : 10.5035, 106.8658
//132-142 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam :10.7774, 106.6974


router.get("/weather", async (req, res) => {
  var listStation = [
    [21.2573, 105.85],
    [21.0306, 105.8573],
    [21.0448, 105.4404],
    [21.0034, 105.6323],
    [20.7627, 105.8318],
    [16.0503, 108.2191],
    [16.0695, 108.1966],
    [16.0974, 108.1393],
    [16, 108.2643],
    [16.0158, 108.2094],
    [11.0278, 106.4831],
    [10.8266, 106.7609],
    [10.7576, 106.5138],
    [10.5035, 106.8658],
    [10.7774, 106.6974],
  ];
  var finalString = "";
  var z = 0;
  for (i in listStation) {
    var lat = listStation[i][0];
    var lon = listStation[i][1];
    await request(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=f96e9af59e72f23e0182dcf7d45aa367",
      function (error, response, body) {
        let data = JSON.parse(body);
        if (response.statusCode === 200) {
          var temp = data["main"]["temp"];
          var humidity = data["main"]["humidity"];
          var speed = data["wind"]["speed"];
          // console.log(temp, humidity, speed);
          weather_result = `"${z}":{"temp":${temp},"humidity":${humidity},"speed":${speed}}`;
          if (finalString === "") {
            finalString = weather_result;
          } else {
            finalString = finalString + "," + weather_result;
          }
          z++;
          if (z === 15) {
            finalString = '{'+finalString+'}'
            var finalResult = JSON.parse(finalString);
            return res.status(200).json(finalResult);
          }
        }
      }
    );
  }

  // console.log(z)
  // res.send('hollyshit')
  // var finalResult = JSON.parse(finalString);
  // res.send(finalResult);
  // const { location } = req.body;
  // var locationId;
  // if (location == "HaiChau") {
  //   locationId = 0;
  // } else if (location == "ThanhKhe") {
  //   locationId = 1;
  // } else if (location == "LienChieu") {
  //   locationId = 2;
  // } else if (location == "NguHanhSon") {
  //   locationId = 3;
  // } else {
  //   locationId = 4;
  // }

  // return res.status(200).json({ });
});
module.exports = router;
