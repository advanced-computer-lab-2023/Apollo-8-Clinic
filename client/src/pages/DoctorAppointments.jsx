import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SidebarPatient";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/patient/appointmentWithFilter")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div style={{ overflow: "auto", height: 440 }}>
      {appointments.map((member) => (
        <div
          key={member.id}
          style={{ border: "1px solid black", borderRadius: 5 }}
        >
          <p>
            <strong>Doctor ID:</strong> {member.doctorId}
          </p>
          <p>
            <strong>patient ID:</strong> {member.patientId}
          </p>
          <p>
            <strong>Date:</strong> {member.date}
          </p>
          <p>
            <strong>status:</strong> {member.status}
          </p>
        </div>
      ))}
    </div>
  );
};

const AppointmentFilterPage = ({ appointments }) => {
  console.log(appointments);
  return (
    <div style={{ overflow: "auto", height: 440 }}>
      {appointments.map((member) => (
        <div
          key={member.id}
          style={{ border: "1px solid black", borderRadius: 5 }}
        >
          <p>
            <strong>Doctor ID:</strong> {member.doctorId}
          </p>
          <p>
            <strong>patient ID:</strong> {member.patientId}
          </p>
          <p>
            <strong>Date:</strong> {member.date}
          </p>
          <p>
            <strong>status:</strong> {member.status}
          </p>
        </div>
      ))}
    </div>
  );
};

const Header = () => (
  <div
    style={{ width: "100%", border: "1px solid black", textAlign: "center" }}
  >
    <h1>MY CLINIC</h1>
  </div>
);

//<button style={{width: '100%', height:40}} onClick={() => {changeContent(<Buttons />);setShowForm(false);}}>Health Packages</button>
const Sidebar1 = ({
  changeContent,
  showForm,
  setShowForm,
  showHello,
  setShowHello,
}) => (
  <div
    style={{
      width: "20%",
      height: "calc(100vh - 100px)",
      border: "1px solid black",
    }}
  >
    <div
      id="welcomeTitle"
      style={{
        border: "1px solid black",
        height: 80,
        fontSize: 25,
        borderRadius: 10,
        textAlign: "center",
      }}
    >
      Welcome Doctor
    </div>
    <button
      style={{ width: "100%", height: 40 }}
      onClick={() => {
        changeContent(<Appointments />);
        setShowHello(true);
      }}
    >
      Appointments
    </button>
  </div>
);

const MainContent = ({ content }) => (
  <div
    style={{
      width: "60%",
      height: "calc(100vh - 100px)",
      border: "1px solid black",
    }}
  >
    {content}
  </div>
);

const Footer = () => (
  <div
    style={{ width: "100%", border: "1px solid black", textAlign: "center" }}
  >
    <p>Contact us on (+100)123456788 or by email clinic@gmail.com</p>
  </div>
);

const RightSidebar = ({ showForm, showHello }) => (
  <div
    style={{
      width: "20%",
      height: "calc(100vh - 100px)",
      border: "1px solid black",
    }}
  ></div>
);

const MainDoctor = () => {
  const [content, setContent] = useState("Click a button to change content");
  const [showHello, setShowHello] = useState(false);

  //search appointments
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const searchApp = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/doctor/appointmentWithFilter", {
        startDate,
        endDate,
        status,
      })
      .then((response) => {
        console.log(response.data);
        setContent(<AppointmentFilterPage appointments={response.data} />); // Set the content to MainContent with the appointments data
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log(content);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
        <Sidebar />

        <div className="card m-3 col-12" style={{ width: "80%" }}>
          <Header />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "calc(100vh - 100px)",
            }}
          >
            <Sidebar1
              changeContent={setContent}
              showHello={showHello}
              setShowHello={setShowHello}
            />
            <MainContent content={content} />
            <div
              style={{
                width: "20%",
                height: "calc(100vh - 100px)",
                border: "1px solid black",
              }}
            >
              {showHello && (
                <form>
                  <h2>Appointments</h2>
                  <label>
                    Start Date:
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </label>
                  <label>
                    End Date:
                    <input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </label>
                  <label>
                    Status:
                    <input
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </label>
                  <button type="button" onClick={searchApp}>
                    Apply Filter
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
//for the doctor
// ReactDOM.render(<MainDoctor />, document.getElementById('root'));

export default MainDoctor;
