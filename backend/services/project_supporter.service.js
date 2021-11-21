const mysql_connection = require("../db_connection/mysql_connection");

const createProjectSupporter = async (user_info) => {
  const {
    user_id,
    username,
    password,
    firstname,
    lastname,
    birthday,
    email,
    house_no,
    province,
    subdistrict,
    district,
    postcode,
  } = user_info;
  try {
    await mysql_connection.query(`INSERT INTO PROJECT_SUPPORTER (user_id, username, password, firstname, lastname, birthday,
                                                             email, house_no, province, district, subdistrict, postcode)
                                    VALUES ("${user_id}","${username}", "${password}", "${firstname}", "${lastname}", "${birthday}",
                                            "${email}", "${house_no}", "${province}", "${district}", "${subdistrict}",
                                            "${postcode}");`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createTransaction = async (donation_info) => {
  const { transaction_id, user_id, project_id, donation_amount } =
    donation_info;
  await mysql_connection.query(`INSERT INTO TRANSACTION (transaction_id,donation_amount,status,project_id,user_id)
    VALUES ("${transaction_id}", "${donation_amount}","success", "${project_id}", "${user_id}")`);
};

module.exports = {
  createProjectSupporter,
  createTransaction,
};
