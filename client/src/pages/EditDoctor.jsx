import { useRef } from "react";
import Sidebar from "../components/SidebarDoctor";
import axios from "axios";

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
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <Sidebar />
      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <h1 className="display-6">Update My Profile</h1>
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
    </div>
  );
}

export default EditDoctor;
