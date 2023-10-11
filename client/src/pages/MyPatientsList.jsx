import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// lessa me7taga azabat 7ewar el id haaaaaaaaa3333333
function MyPatientsList() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [search, setSearch] = useState('');


//   const { id, setId } = useState();

  useEffect(() => {
    // const id="651fd81f02ac1ed6c024c967";
    axios
      .get( "http://localhost:8000/doctor/viewPatients"+"/?id=651fd81f02ac1ed6c024c967")
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
  function handleFilter() {
    // Navigate to another route and pass the ID as a prop
    navigate(`/viewUpcomingApp`);
  }

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <div className="card-header">
          <h2>Your patients' list</h2>
          <button
                        className="btn btn-success"
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
                    return search.toLowerCase() === ''
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
                      <td><button
                        className="btn btn-success"
                        onClick={() => handleView(item._id)}
                      >
                        view
                      </button></td>
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
