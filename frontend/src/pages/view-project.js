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

const ViewProject = () => {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(null);
  const category = [
    "art",
    "food",
    "music",
    "technology",
    "fashion",
    "health",
    "research",
    "social",
  ];

  const handleSubmitUsername = async (value) => {
    setUsername(value.username);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOST}/owner2/project/${value.username}`
      );

      setData(data.project);
    } catch (e) {
      console.log(e);
    }
  };

  if (!data || !username) {
    return (
      <div className="form-container">
        <Form
          // form={form}
          labelCol={{ span: 6 }}
          onFinish={(value) => {
            handleSubmitUsername(value);
          }}
        >
          <Form.Item name="username" label="ชื่อบัญชีผู้ใช้">
            <Input />
          </Form.Item>

          <Form.Item className="btn-container">
            <button className="btn fill-btn" type="submit" block="true">
              ค้นหา
            </button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="form-container">
        <h1>โครงการของ {username}</h1>
        {data.map((d, i) => (
          <div className="section" key={i}>
            <div className="row">โครงการที่ {i + 1}</div>
            <div className="row">ชื่อโครงการ: {d.project_title}</div>
            <div className="row">วัตถุประสงค์: {d.objective}</div>
            <div className="row">
              หมวดหมู่โครงการ: {category[d.category_id]}
            </div>
            <div className="row">คำอธิบายโครงการ: {d.description}</div>
            <div className="row">ประเภทการระดมทุน: {d.crowd_funding_type}</div>
            <div className="row">วันเริ่มต้นการระดมทุน: {d.start_date}</div>
            <div className="row">วันสิ้นสุดการระดมทุน: {d.due_date}</div>
            <div className="row">
              เงินระดมทุนรวมในปัจจุบัน: {d.funding_goal}
            </div>
            <div className="row">เป้าหมายการระดมทุน: {d.funding_goal}</div>
            <div className="row">สถานะโครงการ: {d.status}</div>
            <div className="row">รูปภาพโครงการ: {d.image_url}</div>
            <div className="row">เป้าหมายการระดมทุน: {d.video_url}</div>
          </div>
        ))}
      </div>
    );
  }
};

export default ViewProject;
