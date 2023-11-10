import { useRef } from "react";
import axios from "axios";

function Forget(){
    {
        const nameo = useRef(null);
        const PINO = useRef(null);
        const change = useRef(null);
      
        const EnterPin = (e)=>{

            const name=nameo.current.value;
            
            const PIN=PINO.current.value;
            console.log(PIN)

            axios
            .post(" http://localhost:8000/admin/compare", {
              name,
              PIN
            })
            .then((result) => {
              console.log(result.data.type)
              sessionStorage.setItem('token',JSON.stringify(result.data.token));
              if(result.data.type==='Doctor'){
                 window.location.pathname = '/changePassDoc';
              }
              else if(result.data.type==='Patient'){
                window.location.pathname = '/changePassPat';
              }
              else{
                window.location.pathname = '/changePassAdm';
              }
             
            })
            .catch((err) => console.log(err));

        }
      
        const sendmail = (e) => {
            const name=nameo.current.value;
            console.log(name);
            change.current.style.display='block'; 
            
            axios
            .post(" http://localhost:8000/admin/forget", {
              name
            })
            .then((result) => {

              console.log(result);
            })
            .catch((err) => console.log(err));
        };

        
        return (
          <div className="d-flex justify-content-center align-itelms-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
              <h2>Forget Pssword</h2>
                <p style={{fontSize:'10px'}} class="text-body-secondary">
                 A mail will be sent to username email in it Verfication Pin 
                </p>

                <label htmlFor="email">
                    <strong>Username</strong>
                  </label>
                <div style={{display:"inline-flex"}}>
                <div className="mb-3">
                 
                  <input
                    ref={nameo}
                    type="text"
                    placeholder="Enter Username"
                    autoComplete="off"
                    name="username"
                    className="form-control rounded-0"
                  />
                </div>
                <button onClick={sendmail} style={{height:'40px'}} class="btn btn-primary" type="submit">send</button>
                </div>
                <div ref={change} style={{display:'none'}}>
                <div className="mb-3">
                  <label htmlFor="email">
                    <strong>PIN</strong>
                  </label>
                  <input
                  ref={PINO}
                    type="number"
                    placeholder="Enter PIN sent"
                    name="password"
                    className="form-control rounded-0"

                  />
                </div>
      
                <button
                  style={{ marginTop: "10px" }}
                  type="submit"
                  className="btn btn-success w-100 rounded-0"
                  onClick={EnterPin}
                >
                  Change password
                </button>
                </div>
            </div>
          </div>
        );
      }
      
      
}

export default Forget;