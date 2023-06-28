const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const path = require('path');
const app = express();
const port = 3600;
const route = require('./Routes');



app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));


const URL = 'mongodb+srv://phong160695:wdxotq8hi7OlmmYR@database.uc8jtfy.mongodb.net/PBL?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

//connect database
connectDB()

route(app);


const Device = require("./models/Device")
const Station = require("./models/Station")
const DeviceValue  = require("./models/DeviceValue")
var request = require('request');

var name = "ĐN-1"
var cron = require('node-cron');
var finalList =[]
async function findDevice (name,temp,humidity,wind){
  var deviceList = await Device.find().populate({path: 'stationId', model:'Station',select:['ward'],match:{nameStation: name}})
  for(var i =0; i<deviceList.length ;i++ ){
    if(deviceList[i]['stationId'] !== null){
      finalList.push(deviceList[i])
    }
  }
  for(var j=0; j<finalList.length; j++){
    if(finalList[j]['role'] === 1){
      var newDeviceValue = new DeviceValue({
        value : temp.toString(),
        date : Date.now(),
        deviceId : finalList[j]['_id']
      })
      await newDeviceValue.save()
      }else if(finalList[j]['role'] === 2){
        var newDeviceValue2 = new DeviceValue({
          value : humidity.toString(),
          date : Date.now(),
          deviceId : finalList[j]['_id']
        })
        await newDeviceValue2.save()
      }else{
        var newDeviceValue3 = new DeviceValue({
          value : wind.toString(),
          date : Date.now(),
          deviceId : finalList[j]['_id']
        })
        await newDeviceValue3.save()
      }
    }
}



// var deviceList =  Device.find().populate({path: 'stationId', model:'Station',select:['ward'],match:{nameStation: name}})
//   cron.schedule('*/1 * * * *', () => {
    
// });

// var nothinghere = findDevice(name)
// console.log(nothinghere)

// create database
// var listStation = [
//   [21.2573, 105.85],
//   [21.0306, 105.8573],
//   [21.0448, 105.4404],
//   [21.0034, 105.6323],
//   [20.7627, 105.8318],
//   [16.0503, 108.2191],
//   [16.0695, 108.1966],
//   [16.0974, 108.1393],
//   [16, 108.2643],
//   [16.0158, 108.2094],
//   [11.0278, 106.4831],
//   [10.8266, 106.7609],
//   [10.7576, 106.5138],
//   [10.5035, 106.8658],
//   [10.7774, 106.6974],
// ];
// var listName = ['HN-1','HN-2','HN-3','HN-4','HN-5','ĐN-1','ĐN-1','ĐN-1','ĐN-1','ĐN-1','HCM-1','HCM-2','HCM-3','HCM-4','HCM-5']

// findDevice(name)
// var weather_result = [];
// var z = 0;
// for (i in listStation) {
//   var lat = listStation[i][0];
//   var lon = listStation[i][1];
//  request(
//     "https://api.openweathermap.org/data/2.5/weather?lat=" +
//       lat +
//       "&lon=" +
//       lon +
//       "&appid=f96e9af59e72f23e0182dcf7d45aa367",
//     function (error, response, body) {
//       let data = JSON.parse(body);
//       if (response.statusCode === 200) {
//         var temp = data["main"]["temp"];
//         var humidity = data["main"]["humidity"];
//         var wind = data["wind"]["speed"];
//         console.log(temp,humidity,wind)
//         findDevice(listName[i],temp,humidity,wind)
//         // weather_result.push({"temp":temp,"humidity":humidity,"wind":wind})
//         // z++;
//         // if (z === 15) {
//         //   return res.status(200).json(weather_result);
//         // }
//       }
//     }
//   );
  
// }








app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});