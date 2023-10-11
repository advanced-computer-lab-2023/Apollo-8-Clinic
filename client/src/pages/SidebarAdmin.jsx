import React from "react";
import "../App.css"

function Sidebar() {

    return (
        <div className="sidebar" style={{ marginLeft: "-15%" }}>
            <ul>
                <h2 style={{ fontWeight: "bolder" }}>Admin Page</h2>
                <li style={{ margin: "20px" }}><a href="/addAdministrator">Add admin</a></li>
                <li style={{ margin: "20px" }}><a href="/patient/allDoctors">List of Doctors</a></li>
                <li style={{ margin: "20px" }}><a href="/pendingDoctors">List of Doctors Pending</a></li>
                <li style={{ margin: "20px" }}><a href="/removeUser">Remove User</a></li>

            </ul>
        </div>
    )
}

export default Sidebar;