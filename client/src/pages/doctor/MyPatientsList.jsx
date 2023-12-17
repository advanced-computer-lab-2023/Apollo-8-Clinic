import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/TopBarDoc";
import BottomBar from "../../components/BottomBar";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MedicationIcon from "@mui/icons-material/Medication";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
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
  function handleFilter(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/PatientUpcomingAppointments/:id`);
  }

  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/viewHealth/${id}`);
  }

  function handleAddHealthRecord(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/AddHealthRecords/${id}`);
  }
  function handleAddPrescription(id) {
    navigate(`/doctor/prescriptions/${id}`);
  }
  function handlePatientAppointmentDetails() {
    // Navigate to another route and pass the ID as a prop
    navigate("/PatientAppointments");
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
            <button
              className="btn btn-primary rounded-2"
              onClick={() => handleFilter()}
            >
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
                    <th>gender</th>
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
                  {data &&
                    data
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.name.toLowerCase().includes(search);
                      })
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.gender}</td>
                          <td>
                            <Tooltip
                              title="view Appointments"
                              placement="bottom"
                            >
                              <IconButton
                                onClick={() =>
                                  handlePatientAppointmentDetails(item._id)
                                }
                              >
                                <PendingActionsIcon></PendingActionsIcon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="view Health Records"
                              placement="bottom"
                            >
                              <IconButton onClick={() => handleView(item._id)}>
                                <FolderSharedIcon></FolderSharedIcon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="add health record"
                              placement="bottom"
                            >
                              <IconButton
                                onClick={() => handleAddHealthRecord(item._id)}
                              >
                                <AddBoxIcon></AddBoxIcon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Prescriptions" placement="bottom">
                              <IconButton
                                onClick={() => handleAddPrescription(item._id)}
                              >
                                <MedicationIcon></MedicationIcon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="add follow up" placement="bottom">
                              <IconButton
                                onClick={() => handleAddPrescription(item._id)}
                              >
                                <MoreTimeIcon></MoreTimeIcon>
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                </tbody>

                {data &&
                  data.filter((item) =>
                    item.name.toLowerCase().includes(search)
                  ).length === 0 &&
                  search.length > 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ color: "red", textAlign: "center" }}
                      >
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
