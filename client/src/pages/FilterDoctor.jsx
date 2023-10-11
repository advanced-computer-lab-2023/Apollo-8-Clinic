import { useEffect, useState } from "react";
import axios from "axios";

function FilterDoctors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTime, setSearchTime] = useState(new Date("1990-03-03T10:12:12.000+00:00"));
  const [searchSpec, setSearchSpec] = useState('');

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
  function handleFilter(){
    // const response= await axios.get("http://localhost:8000/patient/allDoctors");
        console.log(searchTime);

    const filteredDoctors = data.filter((doctor) =>{
      return searchTime === "1990-03-03T10:12:12.000+00:00" && searchSpec.toLowerCase() === ''
        ? doctor:
        searchTime !== "1990-03-03T10:12:12.000+00:00" && searchSpec.toLowerCase() !== ''
        ? doctor.speciality.toLowerCase() === searchSpec && doctor.availableSlots === searchTime:
        searchTime !== "1990-03-03T10:12:12.000+00:00"?
        doctor.speciality.toLowerCase() === searchSpec:
        doctor.availableSlots === searchTime;
    }
  );
  setData(filteredDoctors);
  
  };
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
                <th><input
                      type="text"
                      placeholder="search with a name"
                      autoComplete="off"
                      name="time"
                      className="form-control rounded-0"
                      onChange={(e) => setSearchTime(e.target.value)}
                    /></th>
                <th><input
                      type="text"
                      placeholder="search with a spciality"
                      autoComplete="off"
                      name="spec"
                      className="form-control rounded-0"
                      onChange={(e) => setSearchSpec(e.target.value)}
                    /></th>
                <th><button
                        className="btn btn-success"
                        onClick={() => handleFilter()}
                      >
                        apply filter on speciality and available slots
                      </button></th>
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

export default FilterDoctors;
