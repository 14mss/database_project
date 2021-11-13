import { Form, Input, Button, DatePicker, Upload, Radio, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateProject = () => {
  const projectimg = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: [],
  };

  return (
    <div className="form-container">
      <h1>สร้างโครงการ</h1>
      <Form labelCol={{ span: 6 }}>
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
            name="fundingType"
            label="ประเภทการระดมทุน"
            className="one-col"
          >
            <Radio.Group>
              <Radio value="nonProfitProject">โครงการไม่แสวงหาผลกำไร</Radio>
              <Radio value="commercialProject">โครงการเชิงพาณิชย์</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="projectCategory"
            label="หมวดหมู่โครงการ"
            className="two-col"
            hasFeedback
          >
            <Select placeholder="กรุณาเลือกหมวดหมู่โครงการ">
              <Option value="arts">ศิลปะ</Option>
              <Option value="food">อาหาร</Option>
              <Option value="music">ดนตรี</Option>
              <Option value="technology">เทคโนโลยี</Option>
              <Option value="fashion">แฟชัน</Option>
              <Option value="health">สุขภาพ</Option>
              <Option value="research">วิจัย</Option>
              <Option value="charity">สังคม</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="วันสิ้นสุดการระดมทุน"
            className="two-col"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="fundingGoal"
            label="เป้าหมายการระดมทุน"
            className="two-col"
          >
            <Input />
          </Form.Item>
        </div>
        <div>
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
        </div>
        <Form.Item className="btn-container">
          <button
            className="btn fill-btn"
            htmlType="submit"
            onClick={() => {}}
            block
          >
            สร้างโครงการ
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProject;
