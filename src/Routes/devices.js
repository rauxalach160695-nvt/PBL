const express = require("express");
const router = express.Router();
const Device = require("../models/Device");
const Station = require("../models/Station")
const { ObjectId } = require('mongodb');




//add device follow station

router.post("/add", async (req, res) => {
  try {
    const { nameDevice, status, province, district, ward, street, nameStation } = req.body;
    console.log(req.body)
    //Create new Task
    var newStation = Station({
      nameStation,
      province,
      district,
      ward,
      street,
    });
    await newStation.save();
    var newDevice = new Device({
      nameDevice : "TEMP-"+nameDevice,
      status,
      role: 1,
      stationId : newStation._id,
    });
    await newDevice.save();
    var newDevice = new Device({
      nameDevice : "HUMI-"+nameDevice,
      status,
      role : 2,
      stationId : newStation._id,
    });
    await newDevice.save();
    var newDevice = new Device({
      nameDevice : "WIND-"+nameDevice,
      status,
      role : 3,
      stationId : newStation._id,
    });
    await newDevice.save();
    var newDevice = new Device({
      nameDevice : "CAM-"+nameDevice,
      status,
      role : 4,
      stationId : newStation._id,
    });
    await newDevice.save();

    return res.status(200).json({ message: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get device follow province
router.get("/getdevices", async (req, res) => {
  try {
    const {province } = req.body;
    console.log(req.body)
    var finalList = []
    var deviceList = await Device.find().populate({path: 'stationId', model:'Station',match:{}})
    console.log(typeof(deviceList))
    for(var i =0; i<deviceList.length ;i++ ){
      if(deviceList[i]['stationId'] !== null){
        finalList.push(deviceList[i])
      }
    }
    return res.status(200).json({finalList});
  } catch (err) {
    return res.status(500).json(err);
  }
});

//haichau
// var Thanh Khe : 16.0695, 108.1966
// var Lien Chieu : 16.0974, 108.1393
// var NguHanhSon : 16, 108.2643
// var CamLe : 16, 108.2643

router.get("/data", (req, res) => {
  try {
    var listStation = [
      [16.0503, 108.2191],
       [16.0695, 108.1966],
       [16.0974, 108.1393],
       [16, 108.2643],
       [16, 108.2643],
    ]
    const { location } = req.body;
    var locationId 
    if( location == 'HaiChau'){
      locationId = 0
    }
    else if(location == 'ThanhKhe'){
      locationId = 1
    }else if(location == 'LienChieu'){
      locationId = 2
    }else if(location == 'NguHanhSon'){
      locationId = 3
    }else{
      locationId = 4
    }
    console.log(location)
    console.log(listStation[locationId][0])
    var lat = listStation[locationId][0];
    var lon = listStation[locationId][1];
    console.log(typeof(lat))
    let city = req.query.city;
    request(
      "https://api.openweathermap.org/data/2.5/weather?lat=16.0503&lon=108.2191&appid=f96e9af59e72f23e0182dcf7d45aa367",
      function (error, response, body) {
        let data = JSON.parse(body);
        if (response.statusCode === 200) {
          res.send(data);
        }
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
});


module.exports = router;
