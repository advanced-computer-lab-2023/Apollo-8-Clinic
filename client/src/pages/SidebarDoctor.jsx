import React from "react";
import "../App.css"

function Sidebar() {

    return (
        <div className="sidebar" style={{ marginLeft: "-15%" }}>
            <ul>
                <h2 style={{ fontWeight: "bolder" }}>Doctor Page</h2>
                <li style={{ margin: "20px" }}><a href="/editDoctor">Edit Info</a></li>
                <li style={{ margin: "20px" }}><a href="/viewUpcomingApp">Upcomming Appointments</a></li>
                <li style={{ margin: "20px" }}><a href="/viewMyPatients">My patients List</a></li>

            </ul>
        </div>
    )
}

export default Sidebar;