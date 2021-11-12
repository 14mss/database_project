import "./layout.css";

export function Layout({ children }) {
  return (
    <>
      <div className="navbar-container">
        <div className="gradient-logo">ProjectLauncher</div>
        <div>
          <a href="/">
            <button className="btn">สร้างโครงการ</button>
          </a>
          <a href="/">
            <button className="btn">แก้ไขข้อมูลบัญชี</button>
          </a>
          <a href="/">
            <button className="btn fill-btn">ลงทะเบียน</button>
          </a>
        </div>
      </div>
      <div className="body">{children}</div>
    </>
  );
}
