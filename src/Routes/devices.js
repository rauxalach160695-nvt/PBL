const express = require('express');
const router = express.Router();


router.get('/add',(req, res) => {
    res.send('device here')
  } );

module.exports = router;
