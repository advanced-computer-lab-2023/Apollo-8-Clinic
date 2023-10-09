import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DoctorDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
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
      </div>
    </div>
  );
}

export default DoctorDetails;
