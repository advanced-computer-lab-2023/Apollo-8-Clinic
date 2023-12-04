import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const formatDate = (dateTime) => {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Add this option for AM/PM format
  };
  return new Date(dateTime).toLocaleDateString("en-US", options);
};
const Appointments = (patientID) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/appointment/getPatientAppointments/" +
          patientID.patientID
      )
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  function handleWalletPayment() {
    window.location.href = "/appointmentWalletPayment";
  }
  const handleCreditCardPayment = () => {
    //window.location.href = '/appointmentCreditCardPayment' ;
    axios
      .post("http://localhost:8000/AppointmentCheckout")
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleOpenCancelDialog = (appId) => {
    setSelectedApp(appId);
    setCancelDialogOpen(true);
  };
  
  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };
  
  const handleConfirmCancel = async () =>  {
    // Implement your cancellation logic here
    const reqBody = {
      _id: selectedApp,
    };
    const newApp = await axios.post(
      "http://localhost:8000/appointment/cancelAppointment/:id",
      reqBody
    );
    // /cancelAppointment/:id
    handleCloseCancelDialog();
  };
  
  return (
    <div style={{ overflow: "auto", height: 440 }}>
  {appointments.map((member) => (
    <div
      key={member.id}
      style={{
        border: "1px solid black",
        borderRadius: "20px",
        padding: "10px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the start (left)
      }}
    >
      <div>
        <p>
          <strong>Doctor ID:</strong> {member.doctorId}
        </p>
        <p>
          <strong>Date:</strong> {formatDate(member.date)}
        </p>
        <p>
          <strong>Status:</strong> {member.status}
        </p>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
      {member.status !== 'cancelled' && (
            <>
        <button
          className="btn btn-success m-1"
          onClick={handleWalletPayment}
        >
          Pay using wallet
        </button>
        <form
          action="http://localhost:8000/AppointmentCheckout"
          method="POST"
        >
          <button
            className="btn btn-success m-1"
          >
            Pay using credit card
          </button>
        </form>
              <button
                className="btn btn-success m-1"
                onClick={() => handleRescheduleApp(member._id, member.doctorId)}
              >
                Reschedule Appointment
              </button>
              <button
                className="btn btn-success m-1"
                onClick={() => handleOpenCancelDialog(member._id)}
              >
                Cancel Appointment
              </button>
            </>
          )}
      </div>
    </div>
  ))}
  <Dialog open={cancelDialogOpen} onClose={handleCloseCancelDialog}>
  <DialogTitle>No refunds if time left is less than 24 hours!!.. Are you sure you want to cancel this appointment? 
  </DialogTitle>
  <DialogActions>
    <Button onClick={handleConfirmCancel} color="primary">
      Yes
    </Button>
    <Button onClick={handleCloseCancelDialog} color="primary">
      No
    </Button>
  </DialogActions>
</Dialog>

  
</div>


  );
};

function handleWalletPayment() {
  window.location.href = "/appointmentWalletPayment";
}
function handleRescheduleApp(id,drId){
  window.location.href =(`/RescheduleApp/${id}/${drId}`);
}
const handleCreditCardPayment = () => {
  //window.location.href = '/appointmentCreditCardPayment' ;
  axios
    .post("http://localhost:8000/AppointmentCheckout")
    .then((response) => {})
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const AppointmentFilterPage = ({ appointments }) => {
  const navigate = useNavigate();
  console.log(appointments);
  const [selectedApp, setSelectedApp] = useState(null);
const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

const handleOpenCancelDialog = (appId) => {
  setSelectedApp(appId);
  setCancelDialogOpen(true);
};

const handleCloseCancelDialog = () => {
  setCancelDialogOpen(false);
};

const handleConfirmCancel = async () =>  {
  // Implement your cancellation logic here
  const reqBody = {
    _id: selectedApp,
  };
  const newApp = await axios.post(
    "http://localhost:8000/appointment/cancelAppointment/:id",
    reqBody
  );
  // /cancelAppointment/:id
  setSelectedApp(null);
  handleCloseCancelDialog();
};
  return (
    <div style={{ overflow: "auto", height: 440 }}>
  {appointments.map((member) => (
    <div
      key={member.id}
      style={{
        border: "1px solid black",
        borderRadius: "20px",
        padding: "10px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the start (left)
      }}
    >
          <p>
            <strong>Doctor ID:</strong> {member.doctorId}
          </p>

          <p>
            <strong>Date:</strong> {formatDate(member.date)}
          </p>
          <p>
            <strong>status:</strong> {member.status}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
          {member.status !== 'cancelled' && (
            <>
        <button
          className="btn btn-success m-1"
          onClick={handleWalletPayment}
        >
          Pay using wallet
        </button>
        <form
          action="http://localhost:8000/AppointmentCheckout"
          method="POST"
        >
          <button
            className="btn btn-success m-1"
          >
            Pay using credit card
          </button>
        </form>
              <button
                className="btn btn-success m-1"
                onClick={() => handleRescheduleApp(member._id, member.doctorId)}
              >
                Reschedule Appointment
              </button>
              <button
                className="btn btn-success m-1"
                onClick={() => handleOpenCancelDialog(member._id)}
              >
                Cancel Appointment
              </button>
            </>
          )}
      </div>
        </div>
      ))}
      <Dialog open={cancelDialogOpen} onClose={handleCloseCancelDialog}>
  <DialogTitle>No refunds if time left is less than 24 hours!!.. Are you sure you want to cancel this appointment? 
  </DialogTitle>
  <DialogActions>
    <Button onClick={handleConfirmCancel} color="primary">
      Yes
    </Button>
    <Button onClick={handleCloseCancelDialog} color="primary">
      No
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

const Header = () => (
  <div
    style={{
      backgroundColor: " rgb(65, 105, 225)",
      borderRadius: "50px",
      margin: "10px",
      width: "40%",
      marginLeft: "30%",
    }}
  ></div>
);

const Buttons = () => (
  <div>
    <button>Add</button>
    <button>Delete</button>
    <button>Update</button>
  </div>
);

const Sidebar1 = ({
  changeContent,
  showForm,
  setShowForm,
  showHello,
  setShowHello,
  id,
}) => {
  const [TakenID, setTakenID] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);

  return (
    <div
      style={{
        width: "30%",
        height: "calc(100vh - 100px)",
        border: "1px solid black",
        borderRadius: "20px",
      }}
    >
      <button
        className="btn btn-success w-100"
        style={{
          width: "100%",
          height: 40,
          backgroundColor: " rgb(65, 105, 225)",
          borderRadius: "20px",
        }}
        onClick={() => {
          changeContent(<Appointments patientID={id} />);
          setShowForm(false);
          setShowHello(true);
        }}
      >
        Appointments
      </button>
    </div>
  );
};

const MainContent = ({ content }) => (
  <div
    style={{
      width: "60%",
      height: "calc(100vh - 100px)",
      border: "1px solid black",
      borderRadius: "20px",
    }}
  >
    {content}
  </div>
);

const Footer = () => (
  <div
    style={{
      width: "100%",
      border: "1px solid black",
      textAlign: "center",
      borderRadius: "20px",
    }}
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
      borderRadius: "20px",
    }}
  ></div>
);

const AppPatient = () => {
  const [content, setContent] = useState("Click a button to change content");
  const [showHello, setShowHello] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [TakenID, setTakenID] = useState("");

  //add a new family member
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [relation, setRelation] = useState("");

  //search appointments
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  ///////////
  const patientId = "6522b24e238a2bbfc0ceeb6e";

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
      <div style={{ marginRight: "-5%", marginLeft: "-5%" }}>
        <AppBar
          style={{
            height: "100%",
            backgroundColor: "#F0F0F0",
            overflowY: "auto",
          }}
        >
          <ResponsiveAppBar />
          <div
            style={{
              backgroundColor: " rgb(65, 105, 225)",
              borderRadius: "50px",
              margin: "10px",
              width: "40%",
              marginLeft: "30%",
            }}
          >
            <h1
              style={{
                font: "Arial",
                fontWeight: "bold",
                color: "white",
                margin: "10px",
              }}
            >
              Welcome Patient
            </h1>
          </div>
          <div
            className="card m-3 col-12"
            style={{ width: "90%", left: "3%", borderRadius: "20px" }}
          >
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
                id={patientId}
              />
              <MainContent content={content} />
              <div
                style={{
                  width: "30%",
                  height: "calc(100vh - 100px)",
                  border: "1px solid black",
                  borderRadius: "20px",
                }}
              >
                {showHello && (
                  <form>
                    <h2
                      style={{
                        backgroundColor: " rgb(65, 105, 225)",
                        color: "white",
                        marginBottom: "20px",
                        height: "50px",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      Appointments
                    </h2>
                    <label style={{ marginBottom: "10px" }}>
                      Start Date:
                      <input
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          height: "40px",
                        }}
                        type="text"
                        placeholder="  Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </label>
                    <label style={{ marginBottom: "10px" }}>
                      End Date:
                      <input
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          height: "40px",
                        }}
                        placeholder="  End Date"
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </label>
                    <label style={{ marginBottom: "10px" }}>
                      Status:
                      <input
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          height: "40px",
                        }}
                        placeholder="  Example: Pending"
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </label>
                    <button
                      type="button"
                      className="btn btn-success m-3 btn-sm"
                      style={{
                        marginTop: "5%",
                        width: "50%",
                        fontSize: "16px",
                      }}
                      onClick={searchApp}
                    >
                      Apply Filter
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          <BottomBar />
        </AppBar>
      </div>
    </>
  );
};
//for the patient
//ReactDOM.render(<App />, document.getElementById('root'));

export default AppPatient;
