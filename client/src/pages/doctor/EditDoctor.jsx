import { useRef } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBarDoc";
import BottomBar from "../../components/BottomBar";

function EditDoctor() {
  const email = useRef(null);
  const rate = useRef(null);
  const hospital = useRef(null);

  function onClick(e) {
    // func(email.current.value,rate.current.value,hospital.current.value,ID.current.value)
    e.preventDefault();
    axios
      .post("http://localhost:8000/doctor/UpdateDoctor", {
        email: email.current.value,
        hourlyRate: rate.current.value,
        hospital: hospital.current.value,
        doctorID: "6526653e47c45e179aa6886b",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  return (
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
            Update My Profile
          </h1>
        </div>
        <div
          className="card m-3 col-12"
          style={{ width: "80%", borderRadius: "20px", left: "8%" }}
        >
          <div
            style={{
              width: "50%",
              margin: "auto",
              marginTop: 100,
              padding: "10px",
              border: "5px solid ",
              borderColor: "black",
            }}
          >
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                ref={email}
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Hourly rate</label>
              <input
                ref={rate}
                type="number"
                className="form-control"
                placeholder="Number Of Hours You Work"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Hospital</label>
              <input
                ref={hospital}
                type="text"
                className="form-control"
                placeholder="Put A Correct Hospital Name"
              />
            </div>

            <button type="button" onClick={onClick} className="btn btn-primary">
              Submit
            </button>

            <figcaption style={{ margin: 20 }} className="blockquote-footer">
              note: if somthing you do not want update keep it empty
            </figcaption>
          </div>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default EditDoctor;
