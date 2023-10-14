import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SidebarPatient";

function PrescriptionsDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medicine, setMedicin] = useState([]);
  const [size, setSize] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const apiUrl = "http://localhost:8000/patient/getPerscription/" + id;
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setMedicin(response.data.medicine);
        setSize(response.data.medicine.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const listo = medicine.map((user, i) => {
    console.log(user);
    return (
      <div key={i} className="card" style={{ width: 200, margin: 50 }}>
        <img
          style={{ height: 300, width: 200 }}
          src="https://static.vecteezy.com/system/resources/previews/019/807/779/original/3d-medicine-pill-and-tablet-icon-png.png"
          className="card-img-top"
          alt="no image"
        />
        <div className="card-body">
          <h5 className="card-title">Name is : {user.name}</h5>
          <p className="card-text">Description : {user.dose}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <Sidebar />

      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <div className="image">
          <div>
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>You have {size} medicines</p>
              </blockquote>
            </figure>
          </div>
          <div style={{ display: "inline-flex" }}>{listo}</div>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionsDetails;
