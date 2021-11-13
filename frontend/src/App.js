import RegisterProjectOwner from "./pages/regiseter-projectowner";
import CreateProject from "./pages/create-project";
import EditProfile from "./pages/edit-profile";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="navbar-container">
        <div className="gradient-logo">ProjectLauncher</div>
        <div>
          <Link to="/create-project">
            <button className="btn">สร้างโครงการ</button>
          </Link>
          <Link to="/edit-profile">
            <button className="btn">แก้ไขข้อมูลบัญชี</button>
          </Link>
          <Link to="/">
            <button className="btn fill-btn">ลงทะเบียน</button>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<RegisterProjectOwner />} />
      </Routes>
    </Router>
  );
}

export default App;
