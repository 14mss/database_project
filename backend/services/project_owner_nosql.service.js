const ProjectOwner = require("../schemas/project_owner_model");

const getProjectOwnerByUsername = async (username) => {
  const info = await ProjectOwner.findOne({ likes: { $username: username } });
  return info;
};

const createProjectOwner = async (user_info, verification_info) => {
  const new_user_info = {...user_info, verify_email_status: String(process.env.INITIAL_STATUS)}
  const new_verification_info = {...verification_info, ststus: String(process.env.INITIAL_STATUS)}
  const insert_data = { ...new_user_info, verification_info: new_verification_info };
  console.log(insert_data);
  try {
    await ProjectOwner.create(insert_data);
  } catch (err) {
    throw err;
  }
};
const insertProject = async (id, project_info) => {
  const date = new Date();
  const start_date = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getUTCDate()}`;
  try {
    const new_project_info = {
      ...project_info,
      status: "unpublished",
      start_date: start_date,
    };
    let { project } = await ProjectOwner.findById({ _id: id });
    project.push(new_project_info);
    await ProjectOwner.findOneAndUpdate(id, { project: project });
  } catch (err) {
    throw err;
  }
};

const getAllproject = async  (username) => {
  const {project} = await ProjectOwner.findOne({ likes: { $username: username } });
  return project;

}

module.exports = {
  getProjectOwnerByUsername,
  getAllproject,
  createProjectOwner,
  insertProject,
};
