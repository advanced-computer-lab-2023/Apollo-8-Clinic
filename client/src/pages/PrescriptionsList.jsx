import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/SidebarPatient";

function PrescriptionsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const name = useRef(null);
  const date = useRef(null);
  const status = useRef(null);
  const filter = useRef(null);

  useEffect(() => {
    const apiUrl =
      "http://localhost:8000/patient/getPerscriptions?patientId=6523ba9cd72b2eb0e39cb137";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function handleClick() {
    let body = { patientId: "6523ba9cd72b2eb0e39cb137" };
    if (name.current.checked) {
      body = {
        ...body,
        doctorName: filter.current.value,
      };
    } else if (date.current.checked) {
      body = {
        ...body,
        date: filter.current.value,
      };
    } else {
      body = {
        ...body,
        state: filter.current.value,
      };
    }
    const apiUrl = "http://localhost:8000/patient/filterPerscriptions";
    axios
      .post(apiUrl, body)
      .then((result) => {
        setData(result.data);
        console.log(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/prescriptions/${id}`);
  }

  const listo = data.map((user, i) => {
    console.log(user);
    return (
      <div key={i} style={{ width: 400, display: "inline-flex" }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Prescription number {i}</h5>
            <p className="card-text">Doctor Name is :{user.doctorId.name}</p>
            <p className="card-text">Date is :{user.date}</p>
            <button
              onClick={() => handleView(user._id)}
              type="button"
              className="btn btn-primary"
            >
              See Prescription details
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
        <Sidebar />

        <div className="card m-3 col-12" style={{ width: "80%" }}>
          <div>
            <div className="form-check">
              <input
                ref={name}
                className="form-check-input"
                value="lolos"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label
                style={{ paddingRight: "80%" }}
                className="form-check-label"
                htmlFor="flexRadioDefault1"
              >
                Filter By doctor name
              </label>
            </div>
            <div className="form-check">
              <input
                ref={date}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label
                style={{ paddingRight: "80%" }}
                className="form-check-label"
                htmlFor="flexRadioDefault2"
              >
                Filter by date
              </label>
            </div>
            <div className="form-check">
              <input
                ref={status}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                checked
              />
              <label
                style={{ paddingRight: "80%" }}
                className="form-check-label"
                htmlFor="flexRadioDefault3"
              >
                Filter by status
              </label>
            </div>

            <div className="input-group mb-3" style={{ width: 250 }}>
              <input
                type="text"
                ref={filter}
                name="patientId"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                filter
              </button>
            </div>
          </div>

          <div className="image">{listo}</div>
        </div>
      </div>
    </>
  );
}

export default PrescriptionsList;
