import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarDoctor";

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
    // Navigate to another route and pass the ID as a prop
    navigate(`/viewUpcomingApp`);
  }

  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/viewHealth/${id}`);
  }

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <Sidebar />

      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <div className="card-header">
          <h2>Your patients' list</h2>
          <button className="btn btn-success" onClick={() => handleFilter()}>
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

export default MyPatientsList;
