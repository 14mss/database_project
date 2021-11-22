const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const project_supporter_service = require("../services/project_supporter.service");
require("dotenv").config();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("project supporter router").end();
});

router.post("/register", async (req, res) => {
  const user_id = uuidv4();
  const { user_info } = req.body;
  const { password, ...rest } = user_info;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hash_password = await bcrypt.hash(password, salt);
  const new_user_info = { user_id: user_id, password: hash_password, ...rest };
  try {
    await project_supporter_service.createProjectSupporter(new_user_info);
    return res.send("success").end();
  } catch (err) {
    res.status(400).json({
      status: "Bad Request",
      message: "This username already exist",
    });
  }
});

router.post("/donate", async (req, res) => {
  const { donation_info } = req.body;
  const transaction_id = uuidv4();
  const new_donation_info = {
    ...donation_info,
    transaction_id: transaction_id,
  };
  try {
    await project_supporter_service.createTransaction(new_donation_info);
    res.send("success").end();
  } catch (err) {
    console.log(err);
    res.send("unsuccess").end();
  }
});

module.exports = router;
