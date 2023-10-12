import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "./SidebarPatient";

function PrescriptionsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl =
      "http://localhost:8000/patient/getPerscriptions?patientId=651e8b3bb91d687a2f0eed80";
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

  function handleClick(id) {
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
              onClick={() => handleClick(user._id)}
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

  return <div className="image">{listo}</div>;
}

export default PrescriptionsList;
