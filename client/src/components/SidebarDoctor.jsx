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
        <h2 style={{ fontWeight: "bolder" }}>Doctor Page</h2>
        <li style={{ margin: "20px" }}>
          <a href="/">Home</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/editDoctor">Edit Info</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/doctorAppointments">Appointments</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/viewMyPatients">My patients List</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/viewUpcomingApp">Upcomming Appointments</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/changePassDoc">Change Password</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a onClick={handleSubmit}>Log out</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
