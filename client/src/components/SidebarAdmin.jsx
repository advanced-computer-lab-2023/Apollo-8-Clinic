import "../App.css";

function Sidebar() {
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('token');
    window.location.pathname = '/';
      
  };


  return (
    <div className="sidebar" style={{ marginLeft: "-15%" }}>
      <ul>
        <h2 style={{ fontWeight: "bolder" }}>Admin Page</h2>
        <li style={{ margin: "20px" }}>
          <a href="/">Home</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/addAdministrator">Add admin</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/pendingDoctors">List of Doctors Pending</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/removeUser">Remove User</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/adminHealthPackage">Health Packages</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a onClick={handleSubmit}>Log out</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
