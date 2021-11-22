const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const project_owner_service = require("../services/project_owner.service");
require("dotenv").config();
const router = express.Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const { user_id } = await project_owner_service.getProjectOwnerId(username);
  const user_info = await project_owner_service.getProjectOwnerByUsername(
    username
  );
  const verification_info = await project_owner_service.getVerificationInfoById(
    user_id
  );
  return res
    .json({
      user_info: user_info,
      verification_info: verification_info,
    })
    .status(200);
});

router.get("/:status", async (req, res) => {
  const { status } = req.params;

  const user_info = await project_owner_service.getProjectOwnerByStatus(status);

  return res
    .json({
      user_info: user_info,
    })
    .status(200);
});

router.post("/register", async (req, res) => {
  const user_id = uuidv4();
  const { user_info, verification_info } = req.body;
  const { password, ...rest } = user_info;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hash_password = await bcrypt.hash(password, salt);
  const new_user_info = { user_id: user_id, password: hash_password, ...rest };
  try {
    await project_owner_service.createProjectOwner(
      new_user_info,
      verification_info
    );
    return res.send("success").status(201);
  } catch (err) {
    console.log(err);
    return res.send("unsuccess").status(400);
  }
});

router.patch("/edit", async (req, res) => {
  const { user_info, verification_info, username } = req.body;
  const user_id = await project_owner_service.getProjectOwnerId(username);

  if (!user_id) {
    return res.send("can not find project owner's id");
  }
  const new_user_info = {
    user_id: user_id["user_id"],
    ...user_info,
  };

  try {
    project_owner_service.updateProjectOwnerInfo(
      new_user_info,
      verification_info
    );
    return res.send("success").status(201);
  } catch (err) {
    return res.send("unsuccess").status(400);
  }
});

router.delete("/delete", async (req, res) => {
  const { username } = req.body;
  const user_id = await project_owner_service.getProjectOwnerId(username);
  if (!user_id) {
    return res.send("can not find project owner's id");
  }

  try {
    await project_owner_service.deleteProjectOwner(user_id["user_id"]);
    return res.send("success").status(200);
  } catch (err) {
    return res.send("unsuccess").status(400);
  }
});

module.exports = router;
