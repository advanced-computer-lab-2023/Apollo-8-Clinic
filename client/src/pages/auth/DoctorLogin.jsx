import { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBarHome";
import BottomBar from "../../components/BottomBar";

function Doctorlogin() {
  {
    const [name, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
      e.preventDefault();

      //  console.log(email);
      axios
        .post(" http://localhost:8000/doctor/doctorLogin", {
          name,
          password,
        })
        .then((result) => {
          console.log(result.data.token);
          sessionStorage.setItem("token", JSON.stringify(result.data.token));

          window.location.pathname = "/HomePageDoc";
        })
        .catch((err) => console.log(err));
    };

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
            <h2>Doctor Login</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  autoComplete="off"
                  name="username"
                  className="form-control rounded-0"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="form-control rounded-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a href="/ForgetPassword">ForgetPassword</a>
              <button
                style={{ marginTop: "10px" }}
                type="submit"
                className="btn btn-success w-100 rounded-0"
              >
                Login
              </button>
            </form>
          </div>
          <BottomBar />
        </AppBar>
      </div>
    );
  }
}

export default Doctorlogin;
