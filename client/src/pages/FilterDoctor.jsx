import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SidebarPatient";
import { useNavigate } from "react-router-dom";

function FilterDoctors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTime, setSearchTime] = useState(null);
  const [searchSpec, setSearchSpec] = useState("");
  const navigate = useNavigate();

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
  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    console.log(id);
    navigate(`/viewDoctor/${id}`);
    console.log(id);
  }
  function handleFilter() {
    // const response= await axios.get("http://localhost:8000/patient/allDoctors");
    console.log(searchTime);
    console.log(searchSpec);
    axios
      .post("http://localhost:8000/patient/docFilter", {
        searchTime,
        searchSpec,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data); // Set the content to MainContent with the appointments data
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <Sidebar />

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
                  <th>
                    <input
                      type="text"
                      placeholder="filter by available slots"
                      autoComplete="off"
                      name="time"
                      className="form-control rounded-0"
                      onChange={(e) => setSearchTime(e.target.value)}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder="filter by a spciality"
                      autoComplete="off"
                      name="spec"
                      className="form-control rounded-0"
                      onChange={(e) => setSearchSpec(e.target.value)}
                    />
                  </th>
                  <th>
                    <button
                      className="btn btn-success"
                      onClick={() => handleFilter()}
                    >
                      apply filter on speciality and available slots
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.speciality}</td>
                    <td>{item.hourlyRate}</td>
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

export default FilterDoctors;