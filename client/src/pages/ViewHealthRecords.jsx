/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import "../App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function View() {
    // const [data, setData] = useState([]);
    // const [name, setName] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();
  
    // useEffect(() => {
    //   const apiUrl = "http://localhost:8000/doctor/getHealthRecord";
    //   axios
    //     .get(apiUrl)
    //     .then((response) => {
    //       setData(response.data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //       setLoading(false);
    //     });
    // }, []);
  
    // function handleView(id) {
    //   // Navigate to another route and pass the ID as a prop
    //   navigate(`/doctors/getHealthRecord/${id}`);

  
    return (
<div className="App">



<div>
    <h1 class="title">Health Record of My patients</h1>
    <div>

  <input className="search-box" placeholder="Enter The Patient Name" />
  </div>
  <div>
  <table className="tab" class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Gender</th>
      <th scope="col">Phone Number</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Male</td>
      <td>019292828</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Helen</td>
      <td>Female</td>
      <td>36873673673</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Helen</td>
      <td>Female</td>
      <td>36873673673</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Helen</td>
      <td>Female</td>
      <td>36873673673</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Helen</td>
      <td>Female</td>
      <td>36873673673</td>
    </tr>


  </tbody>
</table>
</div>
</div>

</div>

);
}
export default View;