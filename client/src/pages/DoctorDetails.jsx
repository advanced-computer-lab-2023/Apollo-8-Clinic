import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarDoctor";

function DoctorDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = "http://localhost:8000/doctor/" + id;
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

  const handleBack = () => {
    // Use the navigate function to go to the specified route
    navigate("/pendingDoctors");
  };

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <Sidebar />

      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <div className="card-header">
          <h2>Doctor Details</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              <li>name: {data.name}</li>
              <li>email: {data.email}</li>
              <li>birthDate: {data.birthDate}</li>
              <li>hourlyRate: {data.hourlyRate}</li>
              <li>hospital: {data.hospital}</li>
              <li>eduBackground: {data.eduBackground}</li>
              <li>status: {data.status}</li>
            </ul>
          )}
        </div>
        <button
          className="btn btn-success position-absolute bottom-0 end-0 m-3 btn-lg"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default DoctorDetails;
