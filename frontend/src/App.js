import { Form, Input, Button, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import "./App.css";
import { Layout } from "./compnents/layout.js";

function App() {
  const bookbankimg = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: [],
  };
  const idcardimg = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: [],
  };
  return (
    <Layout>
      <div className="form-container">
        <h1>ลงทะเบียนสำหรับเจ้าของโครงการ</h1>
        <Form labelCol={{ span: 4 }}>
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
                <Form.Item name="firstname" label="เลขบัตรประชาชน">
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item name="lastname" label="วัน เดือน ปีเกิด">
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
            <Form.Item name="address" label="ที่อยู่" className="one-col">
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
            <Form.Item
              name="bankAccountName"
              label="ชื่อบัญชีธนาคาร"
              className="one-col"
            >
              <Input />
            </Form.Item>
            <div className="row">
              <div className="two-col">
                <Form.Item name="bookbanktNo" label="เลขที่บัญชี">
                  <Input />
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item name="bank" label="ธนาคาร">
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
            <h2>อัพโหลดภาพถ่าย</h2>
            <hr></hr>
          </div>
          <div className="section">
            <div className="row">
              <div className="two-col">
                <Form.Item
                  name="bookbankImage"
                  label="ภาพถ่ายหน้าสมุดธนาคาร"
                  className="upload"
                >
                  <Upload {...bookbankimg}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className="two-col right-col">
                <Form.Item
                  name="idCardImage"
                  label="รูปบัตรประชาชน"
                  className="upload"
                >
                  <Upload {...idcardimg}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
          </div>
          <Form.Item className="btn-container">
            <button
              className="btn fill-btn"
              htmlType="submit"
              onClick={() => {}}
              block
            >
              สงทะเบียน
            </button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default App;
