const mongoose = require("mongoose");
const { Schema } = mongoose;

const verification_info_schemas = new Schema({
  citizen_id: {
    type: String,
    required: true,
    maxlength: 13,
  },
  laser_id: {
    type: String,
    required: true,
    maxlength: 12,
  },
  bank_name: {
    type: String,
    required: true,
    maxlength: 45,
  },
  account_number: {
    type: String,
    required: true,
    maxlength: 20,
  },
  acc_firstname: {
    type: String,
    required: true,
    maxlength: 45,
  },
  acc_lastname: {
    type: String,
    required: true,
    maxlength: 45,
  },
  book_bank_image_url: {
    type: String,
    required: true,
    maxlength: 2048,
  },
  id_card_image_url: {
    type: String,
    required: true,
    maxlength: 45,
  },
  status: {
    type: String,
    default: "in progress",
    required: true,
    maxlength: 20,
  },
});

const project_schemas = new Schema({
  project_id: {
    type: String,
    _id: true,
    required: true,
  },
  category_id: {
    type: Number,
    required: true,
  },
  project_title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  objective: {
    type: String,
    required: true,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2048,
  },
  video_url: {
    type: String,
    required: true,
    maxlength: 2048,
  },
  image_url: {
    type: String,
    required: true,
    maxlength: 2048,
  },
  start_date: {
    type: Date,
    default: mongoose.now(),
  },
  due_date: {
    type: Date,
    required: true,
  },
  crowd_funding_type: {
    type: String,
    requird: true,
    maxlength: 10,
  },
  funding_goal: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "unpublished",
    required: true,
    maxlength: 20,
  },
  donation_amount: {
    type: Number,
    default: 0.0,
    required: true,
  },
});

const project_owner_schemas = new Schema({
  user_id: {
    _id: true,
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 16,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 45,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 45,
  },
  birthday: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  verify_email_status: {
    type: String,
    required: true,
    maxlength: 20,
    default: "in progress",
  },
  house_no: {
    type: String,
    required: true,
    maxlength: 10,
  },
  province: {
    type: String,
    required: true,
    maxlength: 45,
  },
  district: {
    type: String,
    required: true,
    maxlength: 45,
  },
  postcode: {
    type: String,
    required: true,
    maxlength: 5,
  },
  verification_info: {
    type: verification_info_schemas,
    required: true,
  },
  project: [project_schemas],
});

const ProjectOwner = mongoose.model(
  "project_owner_schemas",
  project_owner_schemas
);

module.exports = ProjectOwner;
