import "../App.css";

function Sidebar() {
  return (
    <div className="sidebar" style={{ marginLeft: "-15%" }}>
      <ul>
        <h2 style={{ fontWeight: "bolder" }}>Patient Page</h2>
        <li style={{ margin: "20px" }}>
          <a href="/">Home</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/allDoctors">List of Doctors</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/prescriptionsList">List of Prescriptions</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/patientFamilyAppointments">Add Family Member</a>
        </li>
        <li style={{ margin: "20px" }}>
          <a href="/patientFamilyAppointments"> View Appointments </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
