const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const TaskAssignment = require("../models/TaskAssignment");

router.post("/create", async (req, res) => {
  try {
    const { nameTask, completed, dayStart, dayEnd, deviceId, userIds } =
      req.body;

    //Create new Task
    var newTask = new Task({
      nameTask,
      completed,
      dayStart,
      dayEnd,
      deviceId,
      userIds,
    });
    await newTask.save();

    return res.status(200).json({ message: true });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});

router.put("/edit", async (req, res) => {
  try {
    const { taskId, nameTask, completed, dayStart, dayEnd, deviceId, userIds } =
      req.body;
    await Task.findOneAndUpdate(
      { _id: taskId },
      {
        nameTask: nameTask,
        completed: completed,
        dayStart: dayStart,
        dayEnd: dayEnd,
        deviceId: deviceId,
        userIds: userIds,
      }
    );

    return res.status(200).json({ message: true });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
});

router.delete("/edit", async (req, res) => {
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
