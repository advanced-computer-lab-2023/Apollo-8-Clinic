import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// lessa me7taga azabat 7ewar el id haaaaaaaaa3333333
function UpcomingAppointments() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
//   const { id, setId } = useState();

  useEffect(() => {
    // const id="651fd81f02ac1ed6c024c967";
    axios
      .get( "http://localhost:8000/doctor/futureAppointmentPatients"+"/?id=651fd81f02ac1ed6c024c967")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log("henaaaa"+response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        console.log("henaaaa22222222222"+response);

      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <div className="card-header">
          <h2>Patients you have an upcoming appointment with</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleView(item._id)}
                      >
                        view
                      </button>
                    </td>
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

export default UpcomingAppointments;
