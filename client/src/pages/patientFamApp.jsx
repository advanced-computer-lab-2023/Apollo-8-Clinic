import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SidebarPatient";

function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/patient/Family")
      .then((response) => {
        setFamilyMembers(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div style={{ overflow: "auto", height: 440 }}>
      {familyMembers.map((member) => (
        <div
          key={member.id}
          style={{ border: "1px solid black", borderRadius: 5 }}
        >
          <p>
            <strong>Name:</strong> {member.name}
          </p>
          <p>
            <strong>National ID:</strong> {member.nationalID}
          </p>
          <p>
            <strong>Age:</strong> {member.age}
          </p>
          <p>
            <strong>Gender:</strong> {member.gender}
          </p>
          <p>
            <strong>Relation:</strong> {member.relation}
          </p>
        </div>
      ))}
    </div>
  );
}

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

const Buttons = () => (
  <div>
    <button>Add</button>
    <button>Delete</button>
    <button>Update</button>
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
      Welcome Patient
    </div>
    <button
      style={{ width: "100%", height: 40 }}
      onClick={() => {
        changeContent(<FamilyMembers />);
        setShowForm(true);
        setShowHello(false);
      }}
    >
      Family Members{" "}
    </button>
    <button
      style={{ width: "100%", height: 40 }}
      onClick={() => {
        changeContent(<Appointments />);
        setShowForm(false);
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

const AppPatient = () => {
  const [content, setContent] = useState("Click a button to change content");
  const [showHello, setShowHello] = useState(false);
  const [showForm, setShowForm] = useState(false);

  //add a new family member
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [relation, setRelation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const familyMember = { name, nationalID, age, gender, relation };
    axios
      .post("http://localhost:8000/patient/AddFamilyMember", familyMember)
      .then((res) => console.log(res.data));
  };
  //search appointments
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const patientId = "6523ba9cd72b2eb0e39cb137";

  const searchApp = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/doctor/appointmentWithFilter", {
        startDate,
        endDate,
        status,
        patientId,
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
              showForm={showForm}
              setShowForm={setShowForm}
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
              {showForm && (
                <form
                  style={{ display: "flex", flexDirection: "column" }}
                  onSubmit={handleSubmit}
                >
                  <h2>Family Member</h2>
                  <label style={{ display: "block" }}>
                    Name:
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    National ID:
                    <input
                      type="text"
                      style={{ width: "12" }}
                      value={nationalID}
                      onChange={(e) => setNationalID(e.target.value)}
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    Age:
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    Gender:
                    <input
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    Relation:
                    <input
                      type="text"
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                    />
                  </label>
                  <button style={{ display: "block" }} type="submit">
                    Submit
                  </button>
                </form>
              )}

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
          <Footer />
        </div>
      </div>
    </>
  );
};
//for the patient
//ReactDOM.render(<App />, document.getElementById('root'));

export default AppPatient;
