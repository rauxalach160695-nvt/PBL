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


app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});