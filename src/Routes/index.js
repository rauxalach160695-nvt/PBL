const devicesRouter = require("./devices");
const dbRouter = require("./db");
const usersRouter = require("./users");
const taskRouter = require("./tasks");
const passport = require("passport");
const passportConfig = require("../middleware/passport");

function route(app) {
  app.use("/devices", devicesRouter);

  app.use("/db", dbRouter);

  app.use("/users", usersRouter);

  app.use("/task", taskRouter);

  app.use("/", (req, res) => {
    return res.status(200).json({"running base":'error'})
  });
}

module.exports = route;
