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

const updateDonationAmount = async (project_id) => {
  try {
    const [rows, fields] = await mysql_connection.query(
      `SELECT SUM(DONATION_AMOUNT) AS amount FROM TRANSACTION WHERE PROJECT_ID = "${project_id}"`
    );
    const { amount } = rows[0];
    if (!amount) {
      await mysql_connection.query(
        `UPDATE PROJECT SET DONATION_AMOUNT=0 WHERE PROJECT_ID="${project_id}"`
      );
    } else {
      await mysql_connection.query(
        `UPDATE PROJECT SET DONATION_AMOUNT=${amount} WHERE PROJECT_ID="${project_id}"`
      );
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createProject,
  updateDonationAmount,
};
