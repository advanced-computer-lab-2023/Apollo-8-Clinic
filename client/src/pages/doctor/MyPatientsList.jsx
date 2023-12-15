import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/TopBarDoc";
import BottomBar from "../../components/BottomBar";

function MyPatientsList() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/doctor/viewPatients/6526653e47c45e179aa6886b")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  function handleFilter() {
    navigate(`/viewUpcomingApp`);
  }

  function handleView(id) {
   
    navigate(`/viewHealth/${id}`);
  }

  function handleAddHealthRecord(id) {
    navigate(`/AddHealthRecords/${id}`);
  }
  function handlePatientAppointmentDetails() {
    navigate('/PatientAppointments');
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
          className="card m-3 col-12"
          style={{ width: "80%", borderRadius: "20px", left: "8%" }}
        >
          <div className="card-header">
            <h2>Your patients' list</h2>
           <button className="btn btn-primary rounded-2" onClick={() => handleFilter()}>
              filter to future appointments
            </button>
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
                    <th>
                      <input
                        type="text"
                        placeholder="search with a name"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    })
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          <button
                            className="btn btn-primary rounded-2"
                            onClick={() => handlePatientAppointmentDetails()}
                          >
                            view PatientAp
                          </button>
                        </td>
                        <td>
                          <button
                           className="btn btn-primary rounded-2"
                            onClick={() => handleView(item._id)}
                          >
                            view Health Records
                          </button>
                        </td>
                        <td></td>
                        <td>
                          <button
                            className="btn btn-primary rounded-2"
                            onClick={() => handleAddHealthRecord(item._id)}
                          >
                            add health record
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
          
                {data.filter((item) => item.name.toLowerCase().includes(search)).length === 0 &&
                  search.length > 0 && (
                    <tr>
                      <td colSpan="6" style={{ color: "red", textAlign: "center" }}>
                        No patients found with this name
                      </td>
                    </tr>
                  )} 
                 
              </table>
              
            )}
          </div>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default MyPatientsList;
