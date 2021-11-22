import RegisterProjectOwner from "./pages/regiseter-projectowner";
import CreateProject from "./pages/create-project";
import EditProfile from "./pages/edit-profile";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ViewProject from "./pages/view-project";
import ViewOwnerByStatus from "./pages/view-owner-by-status";

function App() {
  return (
    <Router>
      <div className="navbar-container">
        <div className="gradient-logo">ProjectLauncher</div>
        <div>
          <Link to="/view-project">
            <button className="btn">ดูข้อมูลโครงการ</button>
          </Link>
          <Link to="/edit-profile">
            <button className="btn">แก้ไขข้อมูลบัญชี</button>
          </Link>
          <Link to="/view-owner-by-status">
            <button className="btn">ค้นหาเจ้าของโครงการ</button>
          </Link>
          <Link to="/">
            <button className="btn fill-btn">ลงทะเบียน</button>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/view-project" element={<ViewProject />} />
        <Route path="/view-owner-by-status" element={<ViewOwnerByStatus />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<RegisterProjectOwner />} />
      </Routes>
    </Router>
  );
}

export default App;
