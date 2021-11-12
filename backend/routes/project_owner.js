const express = require('express');
const mysql_connection = require('../db_connection/mysql_connection');
require('dotenv').config()
const router = express.Router()


router.get('/',async (req,res)=>{
    // const [rows,fields] = await mysql_connection.query( 'SELECT * FROM CUSTOMER');
    return res.send('project owner route');
});

module.exports = router;