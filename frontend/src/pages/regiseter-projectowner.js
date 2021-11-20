import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";

const RegisterProjectOwner = () => {
  const [form] = Form.useForm();

  const handleSubmitMongo = async () => {
    const value = form.getFieldValue();
    console.log(value);
    const bd = value["birthday"].format("YYYY-MM-DD");

    const obj = {
      user_info: {
        username: value.username,
        password: value.password,
        firstname: value.firstname,
        lastname: value.lastname,
        birthday: bd,
        email: value.email,
        house_no: value.house_no,
        subdistrict: value.subdistrict,
        district: value.district,
        province: value.province,
        postcode: value.postcode,
      },
      verification_info: {
        citizen_id: value.citizen_id,
        laser_id: value.laser_id,
        bank_name: value.bank_name,
        account_number: value.account_number,
        acc_firstname: value.acc_firstname,
        acc_lastname: value.acc_lastname,
        book_bank_image_url: "http/fsadfasdfdsaf",
        id_card_imaage_url: "http/kfasdfasdfds",
      },
    };

    try {
      await axios.post(`${process.env.REACT_APP_HOST}/owner2/register`, obj);
      message.success("การลงทะเบียนเสร็จสมบูรณ์ (mongo)");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (value) => {
    const bd = value["birthday"].format("YYYY-MM-DD");

    const obj = {
      user_info: {
        username: value.username,
        password: value.password,
        firstname: value.firstname,
        lastname: value.lastname,
        birthday: bd,
        email: value.email,
        house_no: value.house_no,
        subdistrict: value.subdistrict,
        district: value.district,
        province: value.province,
        postcode: value.postcode,
      },
      verification_info: {
        citizen_id: value.citizen_id,
        laser_id: value.laser_id,
        bank_name: value.bank_name,
        account_number: value.account_number,
        acc_firstname: value.acc_firstname,
        acc_lastname: value.acc_lastname,
        book_bank_image_url: "http/fsadfasdfdsaf",
        id_card_imaage_url: "http/kfasdfasdfds",
      },
    };

    try {
      await axios.post(`${process.env.REACT_APP_HOST}/owner/register`, obj);
      message.success("การเปลี่ยนข้อมูลเสร็จสมบูรณ์");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form-container">
      <h1>ลงทะเบียนสำหรับเจ้าของโครงการ</h1>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        onFinish={(value) => {
          handleSubmit(value);
        }}
      >
        <div className="section">
          <div className="row">
            <div className="two-col">
              <Form.Item name="username" label="ชื่อบัญชีผู้ใช้">
                <Input />
              </Form.Item>
            </div>
            <div className="two-col right-col">
              <Form.Item
                name="email"
                label="อีเมล"
                rules={[
                  {
                    type: "email",
                    message: "รูปแบบอีเมลของคุณไม่ถูกต้อง",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="two-col">
              <Form.Item
                name="password"
                label="รหัสผ่าน"
                rules={[
                  {
                    pattern: new RegExp(
                      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/g
                    ),
                    message:
                      "รหัสผ่านจะต้องประกอบด้วย ตัวอักษรภาษาอังกฤษ พิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
            </div>
            <div className="two-col right-col">
              <Form.Item
                name="confirm"
                label="ยืนยันรหัสผ่าน"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("การยืนยันรหัสผ่านไม่สำเร็จ")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>
          </div>
        </div>
        <div>
          <h2>ข้อมูลส่วนบุคคล</h2>
          <hr></hr>
        </div>
        <div className="section">
          <div className="row">
            <div className="two-col">
              <Form.Item name="firstname" label="ชื่อจริง">
                <Input />
              </Form.Item>
            </div>
            <div className="two-col right-col">
              <Form.Item name="lastname" label="นามสกุล">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="two-col">
              <Form.Item name="citizen_id" label="เลขบัตรประชาชน">
                <Input />
              </Form.Item>
            </div>

            <div className="two-col right-col">
              <Form.Item name="laser_id" label="รหัสหลังบัตรประชาชน">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            {" "}
            <div className="two-col">
              <Form.Item name="birthday" label="วัน เดือน ปีเกิด">
                <DatePicker format="DD-MM-YYYY" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div>
          <h2>รายละเอียดที่อยู่</h2>
          <hr></hr>
        </div>
        <div className="section">
          <Form.Item name="house_no" label="ที่อยู่" className="one-col">
            <Input />
          </Form.Item>
          <div className="row">
            <div className="two-col">
              <Form.Item name="province" label="จังหวัด">
                <Input />
              </Form.Item>
            </div>
            <div className="two-col right-col">
              <Form.Item name="district" label="อำเภอ/เขต">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="two-col">
              <Form.Item name="subdistrict" label="ตำบล/แขวง">
                <Input />
              </Form.Item>
            </div>
            <div className="two-col right-col">
              <Form.Item name="postcode" label="รหัสไปรษณีย์">
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
        <div>
          <h2>ข้อมูลบัญชีธนาคาร</h2>
          <hr></hr>
        </div>
        <div className="section">
          <div className="row">
            <div className="two-col">
              <Form.Item name="acc_firstname" label="ชื่อ">
                <Input />
              </Form.Item>
            </div>
            <div className="two-col right-col">
              <Form.Item name="acc_lastname" label="นามสกุล">
                <Input />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="two-col">
              <Form.Item name="account_number" label="เลขที่บัญชี">
                <Input />
              </Form.Item>
            </div>
            <div className="two-col right-col">
              <Form.Item name="bank_name" label="ธนาคาร">
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>

        <Form.Item className="btn-container">
          <button className="btn fill-btn" type="submit" block="true">
            สงทะเบียน
          </button>
        </Form.Item>
      </Form>
      <button className="btn fill-btn" onClick={handleSubmitMongo} block="true">
        Mongo
      </button>
    </div>
  );
};

export default RegisterProjectOwner;
