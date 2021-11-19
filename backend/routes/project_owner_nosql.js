const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const mongo_service = require("../services/project_owner_nosql.service");
const router = express.Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const data = await mongo_service.getProjectOwnerByUsername(username);
    if (!data) {
      return res.send("not found").status(404);
    }
    return res.send(data).status(200);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.get("/project/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const project = await mongo_service.getAllproject(username);
    if (project.length === 0) {
      return res.send("not found").status(404);
    }
    return res.json({ project }).status(200);
  } catch (err) {
    return res.send("unsuccess").status(400);
  }
});

router.post("/create", async (req, res) => {
  const user_id = uuidv4();
  const { user_info, verification_info } = req.body;
  const { password, ...rest } = user_info;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hash_password = await bcrypt.hash(password, salt);
  const new_user_info = { user_id: user_id, password: hash_password, ...rest };
  try {
    await mongo_service.createProjectOwner(new_user_info, verification_info);
    return res.send("success").status(201);
  } catch (err) {
    return res.send("unsuccess").status(400);
  }
});

router.post("/project", async (req, res) => {
  const { username, project_info } = req.body;

  try {
    const { _id } = await mongo_service.getProjectOwnerByUsername(username);
    if (!_id) {
      return res.send("could not find project owner").status(404);
    }
    await mongo_service.insertProject(_id, project_info);
    res.send("success").status(201);
  } catch (err) {
    return res.send("unsuccess").status(400);
  }
});

module.exports = router;
