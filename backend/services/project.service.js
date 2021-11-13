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
  const start_date = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getUTCDate()}`;
  const donation_amount = 0.0;
  try {
    await mysql_connection.query(`INSERT INTO PROJECT 
                                        VALUES(
                                            "${project_id}", "${category_id}", "${project_title}", "${objective}",
                                            "${description}", "${video_url}", "${image_url}", "${start_date}","${due_date}", 
                                            "${crowd_funding_type}", ${funding_goal},  "unpublished", ${donation_amount}, "${user_id}"
                                        )`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createProject,
};
