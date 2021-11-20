const mysql_connection = require("../db_connection/mysql_connection");

const createProject = async (project_info) => {
  const {
    project_id,
    category_id,
    project_title,
    objective,
    description,
    video_url,
    image_url,
    due_date,
    crowd_funding_type,
    funding_goal,
    user_id,
  } = project_info;
  const date = new Date();
  try {
    await mysql_connection.query(`INSERT INTO PROJECT (project_id, category_id, project_title, objective,
                                                        description, video_url, image_url, due_date, crowd_funding_type, 
                                                        funding_goal, user_id)
                                        VALUES(
                                            "${project_id}", "${category_id}", "${project_title}", "${objective}",
                                            "${description}", "${video_url}", "${image_url}", "${due_date}", 
                                            "${crowd_funding_type}", ${funding_goal}, "${user_id}"
                                        )`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createProject,
};
