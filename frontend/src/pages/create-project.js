import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Radio,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const { Option } = Select;

const CreateProject = () => {
  // const projectimg = {
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   onChange({ file, fileList }) {
  //     if (file.status !== "uploading") {
  //       console.log(file, fileList);
  //     }
  //   },
  //   defaultFileList: [],
  // };
  const handleSubmit = async (value) => {
    const obj = {
      username: value.username,
      project_info: {
        category_id: parseInt(value.category_id),
        project_title: value.project_title,
        objective: value.project_title,
        description: value.project_title,
        video_url: value.project_title,
        image_url: value.project_title,
        due_date: value.due_date,
        crowd_funding_type: value.crowd_funding_type,
        funding_goal: parseInt(value.funding_goal),
      },
    };
    try {
      const res = await axios.post("http://localhost:5000/owner/register", obj);
      message.success("การลงทะเบียนเสร็จสมบูรณ์");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>สร้างโครงการ</h1>
      <Form
        labelCol={{ span: 6 }}
        onFinish={(value) => {
          handleSubmit(value);
        }}
      >
        <div className="section">
          <Form.Item name="title" label="ชื่อโครงการ" className="one-col">
            <Input />
          </Form.Item>
          <Form.Item name="objective" label="วัตถุประสงค์" className="one-col">
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="คำอธิบายโครงการ"
            className="one-col with-height"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="crowd_funding_type"
            label="ประเภทการระดมทุน"
            className="one-col"
          >
            <Radio.Group>
              <Radio value="non-profit">โครงการไม่แสวงหาผลกำไร</Radio>
              <Radio value="commercial">โครงการเชิงพาณิชย์</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="category_id"
            label="หมวดหมู่โครงการ"
            className="two-col"
            hasFeedback
          >
            <Select placeholder="กรุณาเลือกหมวดหมู่โครงการ">
              <Option value="1">ศิลปะ</Option>
              <Option value="2">อาหาร</Option>
              <Option value="3">ดนตรี</Option>
              <Option value="4">เทคโนโลยี</Option>
              <Option value="5">แฟชัน</Option>
              <Option value="6">สุขภาพ</Option>
              <Option value="7">วิจัย</Option>
              <Option value="8">สังคม</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="due_date"
            label="วันสิ้นสุดการระดมทุน"
            className="two-col"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="funding_goal"
            label="เป้าหมายการระดมทุน"
            className="two-col"
          >
            <Input />
          </Form.Item>
        </div>
        {/* <div>
          <h2>อัพโหลดรูปภาพและวิดีโอ</h2>
          <hr></hr>
        </div>
        <div className="section">
          <Form.Item
            name="ProjectImage"
            label="รูปภาพโครงการ"
            className="upload one-col"
          >
            <Upload {...projectimg}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="videoUrl"
            label="ลิงก์วิดีโอโครงการ"
            className="two-col"
          >
            <Input />
          </Form.Item>
        </div> */}
        <Form.Item className="btn-container">
          <button className="btn fill-btn" htmlType="submit" block>
            สร้างโครงการ
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProject;
