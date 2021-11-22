const mysql_connection = require("../db_connection/mysql_connection");

const createProjectOwner = async (user_info, verification_info) => {
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
    district,
    subdistrict,
    postcode,
  } = user_info;
  const {
    citizen_id,
    laser_id,
    id_card_image_url,
    acc_firstname,
    acc_lastname,
    account_number,
    bank_name,
    book_bank_image_url,
  } = verification_info;

  try {
    await mysql_connection.query(`START TRANSACTION;
          INSERT INTO PROJECT_OWNER (user_id, username, password, 
            firstname, lastname, birthday, 
            email, house_no, province, district, subdistrict, postcode)
                                    VALUES ("${user_id}","${username}", "${password}", "${firstname}", "${lastname}", "${birthday}",
                                            "${email}", "${house_no}", "${province}", "${district}", "${subdistrict}",
                                            "${postcode}"); 
          INSERT INTO VERIFICATION_INFO (citizen_id, laser_id, bank_name, account_number,
                                                                acc_firstname, acc_lastname,
                                                                book_bank_image_url, id_card_image_url,user_id)
                                       VALUES ("${citizen_id}", "${laser_id}", "${bank_name}", "${account_number}", 
                                                "${acc_firstname}", "${acc_lastname}", "${book_bank_image_url}",
                                                "${id_card_image_url}" , "${user_id}"); 
          COMMIT;`);
    return "success";
  } catch (err) {
    throw err;
  }
};

const getProjectOwnerByUsername = async (username) => {
  const [rows, fields] = await mysql_connection.query(
    `SELECT username, firstname, lastname, birthday, 
    email, house_no, province, district, subdistrict, postcode 
    FROM PROJECT_OWNER WHERE username = "${username}" limit 1;`
  );
  return rows[0];
};

const getVerificationInfoById = async (user_id) => {
  const [rows, fields] = await mysql_connection.query(
    `SELECT citizen_id, laser_id, bank_name, account_number,
     acc_firstname, acc_lastname, book_bank_image_url, id_card_image_url
     FROM VERIFICATION_INFO WHERE user_id="${user_id}"`
  );
  return rows[0];
};

const getProjectOwnerId = async (username) => {
  const [rows, fields] = await mysql_connection.query(
    `SELECT user_id FROM PROJECT_OWNER WHERE username="${username}" limit 1`
  );
  return rows[0];
};

const getProjectOwnerByStatus = async (status) => {
  const [rows, fields] = await mysql_connection.query(
    `CALL showProjectOwnerByStatus("${status}");`
  );
  return rows[0];
};

const deleteProjectOwner = async (user_id) => {
  try {
    await mysql_connection.query(
      `DELETE FROM PROJECT_OWNER WHERE user_id="${user_id}";`
    );
  } catch (err) {
    throw err;
  }
};

const updateProjectOwnerInfo = async (user_info, verification_info) => {
  const {
    user_id,
    username,
    firstname,
    lastname,
    birthday,
    email,
    house_no,
    province,
    district,
    subdistrict,
    postcode,
  } = user_info;

  const {
    citizen_id,
    laser_id,
    id_card_image_url,
    acc_firstname,
    acc_lastname,
    account_number,
    bank_name,
    book_bank_image_url,
  } = verification_info;

  try {
    await mysql_connection.query(`
        UPDATE PROJECT_OWNER 
        SET username="${username}", firstname="${firstname}", lastname="${lastname}",
        birthday="${birthday}", email="${email}", house_no="${house_no}",
        province="${province}", district="${district}", subdistrict ="${subdistrict}",
        postcode="${postcode}" WHERE user_id="${user_id}";
      `);
    await mysql_connection.query(`
        UPDATE VERIFICATION_INFO 
        SET citizen_id="${citizen_id}", laser_id="${laser_id}", bank_name="${bank_name}",
        account_number="${account_number}", acc_firstname="${acc_firstname}", acc_lastname="${acc_lastname}",
        book_bank_image_url="${book_bank_image_url}", id_card_image_url="${id_card_image_url}", status="${process.env.INITIAL_STSTUS}"
        WHERE user_id="${user_id}";
      `);
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createProjectOwner,
  getProjectOwnerByUsername,
  getVerificationInfoById,
  getProjectOwnerId,
  updateProjectOwnerInfo,
  deleteProjectOwner,
  getProjectOwnerByStatus,
};
