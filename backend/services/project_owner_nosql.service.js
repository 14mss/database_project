const ProjectOwner = require("../schemas/project_owner_model");

const getProjectOwnerByUsername = async (username) => {
  const info = await ProjectOwner.findOne({ likes: { $username: username } });
  return info;
};

const createProjectOwner = async (user_info, verification_info) => {
  const new_verification_info = {
    ...verification_info,
    status: String(process.env.INITIAL_STATUS),
  };
  const insert_data = {
    ...user_info,
    verification_info: new_verification_info,
  };

  try {
    await ProjectOwner.insertOne(insert_data);
  } catch (err) {
    throw err;
  }
};
const insertProject = async (id, project_info) => {
  try {
    let { project } = await ProjectOwner.findById({ _id: id });
    project.push(project_info);
    await ProjectOwner.findOneAndUpdate(id, { project: project });
  } catch (err) {
    throw err;
  }
};

const getAllproject = async (username) => {
  const { project } = await ProjectOwner.findOne({
    likes: { $username: username },
  });
  return project;
};

module.exports = {
  getProjectOwnerByUsername,
  getAllproject,
  createProjectOwner,
  insertProject,
};
