import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import ResponsiveAppBar from "../../components/TopBar";

function AllDoctors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchSpec, setSearchSpec] = useState("");
  const [hp, setHp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const patientApiUrl =
      "http://localhost:8000/patient/getPatientHealthPackage/" +
      "6523ba9cd72b2eb0e39cb137";
    const token = JSON.parse(sessionStorage.getItem("token"));
    axios
      .get(patientApiUrl)
      .then((response) => {
        setHp(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
    navigate(`/doctorInfo/${id}`);
    console.log(id);
  }
  function handleViewAvailableSlots(id) {
    // Navigate to another route and pass the ID as a prop
    console.log(id);
    navigate(`/AvailableAppointments/${id}`);
    console.log(id);
  }
  function handleFilter() {
    navigate("/filter");
  }

  function getSessionPrice(hourlyRate) {
    if (hp)
      return hourlyRate + hourlyRate * 0.1 - hourlyRate * hp[0].sessDiscount;
    else return hourlyRate + hourlyRate * 0.1;
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
            All Doctors
          </h1>
        </div>
        <div className="card m-3 col-12" style={{ width: "80%", left: "8%" }}>
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
                        placeholder="search by a name"
                        autoComplete="off"
                        name="name"
                        className="form-control rounded-0"
                        onChange={(e) => setSearchName(e.target.value)}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder="search by a spciality"
                        autoComplete="off"
                        name="spec"
                        className="form-control rounded-0"
                        onChange={(e) => setSearchSpec(e.target.value)}
                      />
                    </th>
                    <th>
                      <button
                        style={{ backgroundColor: "rgb(65, 105, 225)" }}
                        className="btn btn-success"
                        onClick={() => handleFilter()}
                      >
                        or filter with speciality and available slots
                      </button>
                    </th>{" "}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((item) => {
                      return searchName.toLowerCase() === "" &&
                        searchSpec.toLowerCase() === ""
                        ? item
                        : searchName.toLowerCase() !== "" &&
                          searchSpec.toLowerCase() !== ""
                        ? item.speciality.toLowerCase().includes(searchSpec) &&
                          item.name.toLowerCase().includes(searchName)
                        : searchName.toLowerCase() === ""
                        ? item.speciality.toLowerCase().includes(searchSpec)
                        : item.name.toLowerCase().includes(searchName);
                    })
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.speciality}</td>
                        <td>{getSessionPrice(item.hourlyRate)}</td>
                        <td></td>
                        <td></td>
                        <td>
                          <button
                            style={{ backgroundColor: "rgb(65, 105, 225)" }}
                            className="btn btn-success"
                            onClick={() => handleView(item._id)}
                          >
                            view
                          </button>
                        </td>
                        <td>
                          <button
                            style={{ backgroundColor: "rgb(65, 105, 225)" }}
                            className="btn btn-success"
                            onClick={() => handleViewAvailableSlots(item._id)}
                          >
                            view Available slots
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default AllDoctors;