const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config()
const router = express.Router()

router.get('/',(req,res)=>{
    return res.send('project route').end();
})

module.exports = router;