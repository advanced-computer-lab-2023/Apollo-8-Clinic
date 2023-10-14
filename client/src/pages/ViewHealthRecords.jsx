import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SidebarPatient";

function Health() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthDate, setDate] = useState(null);
  const [phone, setPhone] = useState(null);
  const [records, setHealth] = useState([]);
  const { id } = useParams();
  const doctorID = "6526653e47c45e179aa6886b";
  const patientID = "6523ba9cd72b2eb0e39cb137";

  useEffect(() => {
    console.log("apolo");
    const apiUrl = "http://localhost:8000/doctor/getHealthRecord";
    axios
      .post(apiUrl, {
        doctorID,
        patientID,
      })
      .then((response) => {
        if (response.data) {
          setData(response.data);
          setName(response.data[0].patientId.name);
          setEmail(response.data[0].patientId.email);
          setGender(response.data[0].patientId.gender);
          setDate(response.data[0].patientId.birthDate);
          setPhone(response.data[0].patientId.phone);
          setHealth(response.data[0].patientId.health_records.records);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const listo = data.map((user, i) => {
    console.log(user);
    return (
      <div
        key={i}
        className="card"
        style={{
          width: 300,
          margin: 50,
          border: "5px solid ",
          borderColor: "black",
        }}
      >
        <img
          style={{ height: 200, width: 200 }}
          src="https://www.managemore.com/images/appointment.jpg"
          className="card-img-top"
          alt="no image"
        />
        <div className="card-body">
          <h5 className="card-title">Appointment : {i + 1}</h5>
          <p className="card-text">status : {user.status}</p>
          <p className="card-text">date : {user.date}</p>
        </div>
      </div>
    );
  });

  const list = records.map((user, i) => {
    console.log(user);
    return (
      <div
        key={i}
        className="card"
        style={{
          width: 300,
          margin: 50,
          border: "5px solid ",
          borderColor: "black",
        }}
      >
        <img
          style={{ height: 200, width: 200 }}
          src="https://img.freepik.com/free-vector/human-bones-realistic-x-ray-shots_1284-29690.jpg"
          className="card-img-top"
          alt="no image"
        />
        <div className="card-body">
          <h5 className="card-title">Record : {i + 1}</h5>
          <p className="card-text">decription : {user.decription}</p>
          <p className="card-text">date : {user.date}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="image">
      {/*fofaaaaaa
      
      */}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Birth-Date</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{name}</th>
            <td>{email}</td>
            <td>{gender}</td>
            <td>{birthDate}</td>
            <td>{phone}</td>
          </tr>
        </tbody>
      </table>

      {/*fofaaaaaa
      
      */}
      <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
        {listo}
        {list}
      </div>
    </div>
  );
}

export default Health;