import { Form, Input } from "antd";
import { useState } from "react";
import axios from "axios";

const ViewOwnerByStatus = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmitUsername = async (value) => {
    setStatus(value.status);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOST}/owner/${value.status}`
      );

      console.log(data);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  if (!data || !status) {
    return (
      <div className="form-container">
        <h1>ค้นหาเจ้าของโครงการตามสถานะ</h1>
        <Form
          labelCol={{ span: 6 }}
          onFinish={(value) => {
            handleSubmitUsername(value);
          }}
        >
          <div className="section">
            <Form.Item name="status" label="สถานะของเจ้าของโครงการ">
              <Input />
            </Form.Item>

            <Form.Item className="btn-container">
              <button className="btn fill-btn" type="submit" block="true">
                ค้นหา
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="form-container">
        <h1>เจ้าของโครงการที่มีสถานะ {status}</h1>
        {data.map((d, i) => (
          <div className="section" key={i}>
            <div className="row">เจ้าของโครงการที่ {i + 1}</div>
            <div className="row">ชื่อบัญชีผู้ใช้: {d.username}</div>
            <div className="row">ชื่อจริง: {d.firstname}</div>
            <div className="row">นามสกุล: {d.lastname}</div>
          </div>
        ))}
      </div>
    );
  }
};

export default ViewOwnerByStatus;
