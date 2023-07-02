const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const TaskAssignment = require("../models/TaskAssignment");
const passport = require("passport");
const Device = require("../models/Device");
const UserDetail = require("../models/UserDetail");
router.post("/create", async (req, res) => {
  try {
    const { nameTask, completed, dayStart, dayEnd, deviceId, userId } =
      req.body;

    //Create new Task
    var newTask = new Task({
      nameTask,
      completed,
      dayStart,
      dayEnd,
      deviceId,
      userId,
    });
    await newTask.save();

    return res.status(200).json({ message: true });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});

router.post("/gettasks",(passport.authenticate('jwt', {session: false})), async (req, res) => {
  try {
    // const {workSpace } = req.body;
    // console.log(req.body)
    var finalList = []
    var taskList = await Task.find().populate({path: 'userId', model:'User',match:{workSpace:req.user['workSpace']}})
    // var taskList = await Task.find({})
    // console.log(taskList)
    // console.log(typeof(deviceList))
    for(var i =0; i<taskList.length ;i++ ){
      if(taskList[i]['userId'] !== null){
        finalList.push(taskList[i])
      }
    }
    listDevice =[]
    listWorker = []
    obj= {name:"EERerer"}
    for(var j = 0; j< finalList.length ;j++ ){
      var device = await Device.find({_id:finalList[j]['deviceId']})
      var worker = await UserDetail.find({userId:finalList[j]['userId']['_id']})
      listDevice.push(device[0]['nameDevice'])
      listWorker.push(worker[0])
      console.log(device[0]['nameDevice'])
      // finalList[j]['nameDevice'] = device[0]['nameDevice']
      // finalList[j]['nameDevice'] = '123'

      // Object.defineProperty(finalList[j], 'deviceName', {
      //   value: device['nameDevice'],
      //   writable: true,
      //   enumerable: true,
      //   configurable: true
      // });
    }
   
    console.log(listWorker)
    return res.status(200).json({finalList,listDevice,listWorker});
  } catch (err) {
    return res.status(500).json(err);
  }
});



router.put("/edit", async (req, res) => {
  try {
    const { taskId, nameTask, completed, dayStart, dayEnd, deviceId, userId } =
      req.body;
    await Task.findOneAndUpdate(
      { _id: taskId },
      {
        nameTask: nameTask,
        completed: completed,
        dayStart: dayStart,
        dayEnd: dayEnd,
        deviceId: deviceId,
        userId: userId,
      }
    );

    return res.status(200).json({ message: true });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { taskId } =
      req.body;
    await Task.findOneAndDelete(
      { _id: taskId }
    );

    return res.status(200).json({ message: true });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});

module.exports = router;
