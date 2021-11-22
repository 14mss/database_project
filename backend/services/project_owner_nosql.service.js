const ProjectOwner = require("../schemas/project_owner_model");

const getProjectOwnerByUsername = async (username) => {
  const info = await ProjectOwner.findOne(
    { likes: { $username: username } },
    {
      _id: 0,
      username: 1,
      firstname: 1,
      lastname: 1,
      birthday: 1,
      email: 1,
      house_no: 1,
      province: 1,
      district: 1,
      postcode: 1,
      verification_info: {
        citizen_id: 1,
        laser_id: 1,
        bank_name: 1,
        account_number: 1,
        acc_firstname: 1,
        acc_lastname: 1,
        book_bank_imahhe_url: 1,
        id_card_image_url: 1,
      },
    }
  );
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
  try {
    const { project } = await ProjectOwner.findOne({
      username: username,
    });
    return project;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getProjectOwnerByUsername,
  getAllproject,
  createProjectOwner,
  insertProject,
};
