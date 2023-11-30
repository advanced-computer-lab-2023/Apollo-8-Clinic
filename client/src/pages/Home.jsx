import AppBar from "@mui/material/AppBar";
import "../App.css";
import Button1 from "react-bootstrap/Button";
import Card1 from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/TopBarHome";
import BottomBar from "../components/BottomBar";

import img1 from "../images/admin.png";
import img2 from "../images/doc.png";
import img3 from "../images/pat.png";
import img4 from "../images/docsign.jpeg";
import img5 from "../images/docSignUp.jpeg";

function Home() {
  const navigate = useNavigate();
  const handleDoctorSignup = () => {
    navigate("/registerDoctor");
  };
  const handlePatientSignup = () => {
    navigate("/registerPatient");
  };
  const handleAdminLogin = () => {
    navigate("/Adminlogin");
  };
  const handlePatientLogin = () => {
    navigate("/PatientLogin");
  };
  const handleDoctorLogin = () => {
    navigate("/DoctorLogin");
  };
  // const backgroundStyle = {
  //   backgroundImage: 'url("client/src/images/photo.png")',
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  // };
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
          style={{
            width: "80%",
            borderRadius: "20px",
            left: "8%",
            display: "flex",
          }}
        >
          <div style={{ display: "flex" }}>
            <Card1 style={{ width: "18rem", marginRight: "10%" }}>
              <Card1.Img variant="top" src={img3} alt="health package.png" />
              <Card1.Body>
                <Card1.Title>Patient Login</Card1.Title>

                <Button1 variant="primary" onClick={handlePatientLogin}>
                  Login
                </Button1>
              </Card1.Body>
            </Card1>
            <Card1 style={{ width: "18rem", marginRight: "10%" }}>
              <Card1.Img variant="top" src={img2} alt="family.png" />
              <Card1.Body>
                <Card1.Title style={{ marginTop: "45px" }}>
                  Doctor Login
                </Card1.Title>

                <Button1
                  variant="primary"
                  style={{}}
                  onClick={handleDoctorLogin}
                >
                  Login
                </Button1>
              </Card1.Body>
            </Card1>
            <Card1 style={{ width: "18rem" }}>
              <Card1.Img variant="top" src={img1} alt="family.png" />
              <Card1.Body>
                <Card1.Title>Admin Login</Card1.Title>

                <Button1 variant="primary" onClick={handleAdminLogin}>
                  Login
                </Button1>
              </Card1.Body>
            </Card1>
          </div>
          <br />
          <br />
          <div style={{ display: "flex" }}>
            <Card1
              style={{ width: "18rem", marginRight: "11%", marginLeft: "18%" }}
            >
              <Card1.Img variant="top" src={img4} alt="health package.png" />
              <Card1.Body>
                <Card1.Title>Patient SignUp</Card1.Title>

                <Button1 variant="primary" onClick={handlePatientSignup}>
                  Sign Up
                </Button1>
              </Card1.Body>
            </Card1>
            <Card1 style={{ width: "18rem" }}>
              <Card1.Img variant="top" src={img5} alt="family.png" />
              <Card1.Body>
                <Card1.Title>Doctor SignUp</Card1.Title>

                <Button1 variant="primary" onClick={handleDoctorSignup}>
                  Sign Up
                </Button1>
              </Card1.Body>
            </Card1>
          </div>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default Home;
