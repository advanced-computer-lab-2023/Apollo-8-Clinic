import React from "react";
import { useState } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

function SearchDoctor() {
  const [name, setName] = useState();
  const [speciality, setSpeciality] = useState();
  const [data, setData] = useState();
  const [searchResults, setSearchResults] = useState([]);
  
  

  const handleSearch = () => {
    // //e.preventDefault();
    // console.log(name);
    // console.log(email);
    // axios
    //   .get(" http://localhost:8000/patient/docSearch", {
    //     name,
    //     speciality,
    //   })
    // //   .then((result) => {
    // //     console.log(result);
    // //     navigate("/login");
    // //   })
    //   .catch((err) => console.log(err));
    //useEffect(() => {
        const apiUrl = "http://localhost:8000/patient/docSearch";
        
        axios
          .get(apiUrl, {
                name,
                speciality,
              })
          .then((response) => {
            setData(response.data);
            //setLoading(true);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            //setLoading(false);
          });
          navigate('/SearchDoctor');
      //}, []);

     
        // const makeRequest = async () => {
        //   const response = await axios.post("/doctor/searchByNameOrSpec", {
        //     name, // The search term.
        //     speciality, // The speciality of the doctor to search for.
        //   });
    
        //   setSearchResults(response.data);
          
        // };
    
        makeRequest();
      
  };
  
  return(
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
    <div className="card m-3 col-12" style={{ width: "80%" }}>
        <h2>Search By:</h2>
        
          <div className="mb-3">
            {/* <label htmlFor="email">
              <strong>Username</strong>
            </label> */}
            <input
              type="text"
              placeholder="Enter name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            {/* <label htmlFor="n">
              <strong>Name</strong>
            </label> */}
            <input
              type="text"
              placeholder="Enter Speciality"
              autoComplete="off"
              name="speciality"
              className="form-control rounded-0"
              onChange={(e) => setSpeciality(e.target.value)}
            />
          </div>
          
          <td>
                <button
                 className="btn btn-success"
                onClick={() => handleSearch()}
                >
                search
                </button>
             </td>
        
     </div>
    </div>
  );
}
export default SearchDoctor;