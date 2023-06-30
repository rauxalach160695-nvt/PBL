const express = require("express");
const router = express.Router();
const Device = require("../models/Device");
const User = require("../models/User");
const request = require("request");
const fs = require("fs");
const Station = require("../models/Station");

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

//add user

//núi đôi , soc son ,soc son:21.2573,105.85
//hồng hà, chương dương , hoan kiem : 21.0306, 105.8573
//DT87, yên bái, ba vì :21.0448, 105.4404
// ĐL Thăng Long, TT. Quốc Oai, Quốc Oai, Hà Nội, Việt Nam:21.0034, 105.6323
//Cổ Hoàng, Hoàng Long, Phú Xuyên, Hà Nội, Việt Nam :20.7627, 105.8318

//Hòa Thuận Đông, Hải Châu, Đà Nẵng 550000, Việt Nam: 16.0503  108.2191
//K371 Trần Cao Vân, Xuân Hà, Thanh Khê, Đà Nẵng 550000, Việt Nam : 16.0695, 108.1966
//33 Xuân Thiều 33, Hoà Hiệp Nam, Liên Chiểu, Đà Nẵng, Việt Nam : 16.0974, 108.1393
//Mộc Sơn 3, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam : 16, 108.2643
//77-63 Lương Định Của, Khuê Trung, Cẩm Lệ, Đà Nẵng 550000, Việt Nam : 16.0158, 108.2094

// Trần Thị Triên, Nhuận Đức, Củ Chi, Thành phố Hồ Chí Minh, Việt Nam :11.0278, 106.4831
//163 Đ. Tây Hòa, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam :10.8266, 106.7609
// Đ. Trần Đại Nghĩa, Lê Minh Xuân, Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam :10.7576,106.5138
//Rừng Sác, An Thới Đông, Cần Giờ, Thành phố Hồ Chí Minh, Việt Nam : 10.5035, 106.8658
//132-142 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam :10.7774, 106.6974

router.get("/weather", async (req, res) => {
  var listStation = [
    [21.2573, 105.85],
    [21.0292, 105.8573],
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

  var checkStation = [
    21.2573, 21.0292, 21.0448, 21.0034, 20.7627, 16.0503, 16.0695, 16.0974, 16,
    16.0158, 11.0278, 10.8266, 10.7576, 10.5035, 10.7774,
  ];
  var loc = [
    "Sóc Sơn   Sóc Sơn   Hà Nội",
    "Chương Dương   Hoàn Kiếm   Hà Nội",
    "Yên Bái   Ba Vì   Hà Nội",
    "Quốc Oai   Quốc Oai   Hà Nội",
    "Hoàng Long   Phú Xuyên   Hà Nội",
    "Hòa Thuận Đông   Hải Châu   Đà Nẵng",
    "Xuân Hà   Thanh Khê   Đà Nẵng",
    "Hoà Hiệp Nam   Liên Chiểu   Đà Nẵng",
    "Hoà Hải   Ngũ Hành Sơn   Đà Nẵng",
    "Khuê Trung   Cẩm Lệ   Đà Nẵng",
    "Nhuận Đức   Củ Chi   Thành phố Hồ Chí Minh",
    "Phước Long A   Quận 9   Thành phố Hồ Chí Minh",
    "Lê Minh Xuân   Bình Chánh   Thành phố Hồ Chí Minh",
    "An Thới Đông   Cần Giờ   Thành phố Hồ Chí Minh",
    "Phường Bến Thành   Quận 1   Thành phố Hồ Chí Minh",
  ];
  var weather_result = [];
  var z = 0;
  for (i in listStation) {
    var lat = listStation[i][0];
    var lon = listStation[i][1];
    request(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=f96e9af59e72f23e0182dcf7d45aa367",
      function (error, response, body) {
        let data = JSON.parse(body);
        if (response.statusCode === 200) {
          var location = loc[checkStation.indexOf(data['coord']['lat'])];
          var temp = data["main"]["temp"];
          var humidity = data["main"]["humidity"];
          var wind = data["wind"]["speed"];
          console.log(data['coord']['lat'])
          // console.log(temp, humidity, speed);
          // weather_result = `"${z}":{"temp":${temp},"humidity":${humidity},"speed":${speed}}`;
          // if (finalString === "") {
          //   finalString = weather_result;
          // } else {
          //   finalString = finalString + "," + weather_result;
          // }
          weather_result.push({
            location: location,
            temp: temp,
            humidity: humidity,
            wind: wind,
          });
          z++;
          if (z === 15) {
            console.log(weather_result);
            return res.status(200).json(weather_result);
          }
        }
      }
    );
  }
});

router.get("/getStation", async (req, res) => {
  try {
    var listStation = await Station.find({});
    return res.status(200).json(listStation);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;
