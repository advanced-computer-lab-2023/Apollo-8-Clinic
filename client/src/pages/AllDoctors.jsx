import { useEffect, useState } from "react";
import axios from "axios";

function AllDoctors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "http://localhost:8000/patient/allDoctors";
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
        <h2>All Doctors Details</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>speciality</th>
                <th>Session Price</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.speciality}</td>
                  <td>{item.hourlyRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
  );
}

export default AllDoctors;
