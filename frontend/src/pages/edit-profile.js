import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [verificationInfo, setVerificationInfo] = useState(null);

  const [form] = Form.useForm();
  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       const { user_info, verification_info } = await axios.get(
  //         "http://localhost:5000/owner/username"
  //       );
  //       setUserInfo(user_info);
  //       setVerificationInfo(verification_info);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   fetchAllData();
  // }, []);

  const handleSubmit = async (value) => {
    const bd = value["birthday"].format("DD-MM-YYYY");
    const obj = JSON.stringify({
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
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/owner/edit`,
        obj
      );
      message.success("การเปลี่ยนข้อมูลเสร็จสมบูรณ์");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmitUsername = async (value) => {
    try {
      const { user_info, verification_info } = await axios.get(
        `${process.env.REACT_APP_HOST}/owner/${value.username}`
      );
      setUserInfo(user_info);
      setVerificationInfo(verification_info);
      // message.success("การลงทะเบียนเสร็จสมบูรณ์");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    const username = form.getFieldValue("username");
    const obj = JSON.stringify({ username: username });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/owner/delete`,
        obj
      );

      message.success("การลบบัญชีเสร็จสมบูรณ์");
    } catch (e) {
      console.log(e);
    }
  };

  if (!userInfo) {
    return (
      <div className="form-container">
        <Form
          form={form}
          labelCol={{ span: 6 }}
          onFinish={(value) => {
            handleSubmitUsername(value);
          }}
        >
          <Form.Item name="username" label="ชื่อบัญชีผู้ใช้">
            <Input />
          </Form.Item>

          <Form.Item className="btn-container">
            <button className="btn fill-btn" htmlType="submit" block>
              ค้นหา
            </button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="form-container">
        <h1>แก้ไขข้อมูลบัญชีเจ้าของโครงการ</h1>
        <Form
          labelCol={{ span: 6 }}
          onFinish={(value) => {
            handleSubmit(value);
          }}
        >
          <div className="section">
            <div className="row">
              <div className="two-col">
                <Form.Item
                  name="username"
                  label="ชื่อบัญชีผู้ใช้"
                  initialValue={userInfo.username}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item
                  name="email"
                  label="อีเมล"
                  initialValue={userInfo.email}
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
                  initialValue={userInfo.password}
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
                  initialValue={userInfo.confirm}
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
                <Form.Item
                  name="firstname"
                  label="ชื่อจริง"
                  initialValue={userInfo.firstname}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item
                  name="lastname"
                  label="นามสกุล"
                  initialValue={userInfo.lastname}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="two-col">
                <Form.Item
                  name="citizen_id"
                  label="เลขบัตรประชาชน"
                  initialValue={verificationInfo.citizen_id}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item
                  name="laser_id"
                  label="รหัสหลังบัตร"
                  initialValue={userInfo.laser_id}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="two-col">
                <Form.Item
                  name="birthday"
                  label="วัน เดือน ปีเกิด"
                  format="DD-MM-YYYY"
                  initialValue={userInfo.birthday}
                >
                  <DatePicker />
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
            <h2>รายละเอียดที่อยู่</h2>
            <hr></hr>
          </div>
          <div className="section">
            <Form.Item
              name="house_no"
              label="ที่อยู่"
              initialValue={userInfo.house_no}
              className="one-col"
            >
              <Input />
            </Form.Item>
            <div className="row">
              <div className="two-col">
                <Form.Item
                  name="province"
                  label="จังหวัด"
                  initialValue={userInfo.province}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item
                  name="district"
                  label="อำเภอ/เขต"
                  initialValue={userInfo.district}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="two-col">
                <Form.Item
                  name="subdistrict"
                  label="ตำบล/แขวง"
                  initialValue={userInfo.subdistrict}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item
                  name="postcode"
                  label="รหัสไปรษณีย์"
                  initialValue={userInfo.postcode}
                >
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
                <Form.Item
                  name="acc_firstname"
                  label="ชื่อ"
                  initialValue={verificationInfo.acc_firstname}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item
                  name="acc_lastname"
                  label="นามสกุล"
                  initialValue={verificationInfo.acc_lastname}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="two-col">
                <Form.Item
                  name="account_number"
                  label="เลขที่บัญชี"
                  initialValue={verificationInfo.account_number}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item
                  name="bank_name"
                  label="ธนาคาร"
                  initialValue={verificationInfo.bank_name}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
          <button className="btn fill-btn" onClick={handleDelete} block="true">
            ลบบัญชี
          </button>

          <Form.Item className="btn-container">
            <button className="btn fill-btn" type="submit" block="true">
              บันทึก
            </button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default EditProfile;
