import { useRef } from "react";

function EditDoctor() {
  const email = useRef(null);
  const rate = useRef(null);
  const hospital = useRef(null);
  const ID = useRef(null);

  function onClick() {
    // func(email.current.value,rate.current.value,hospital.current.value,ID.current.value)
  }

  return (
    <div>
      <h1 className="display-6">Update My Profile</h1>
      <div
        style={{
          width: "50%",
          margin: "auto",
          marginTop: 100,
          padding: "10px",
          border: "5px solid ",
          borderColor: "black",
        }}
      >
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            ref={email}
            type="email"
            className="form-control"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hourly rate</label>
          <input
            ref={rate}
            type="number"
            className="form-control"
            placeholder="Number Of Hours You Work"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hospital</label>
          <input
            ref={hospital}
            type="text"
            className="form-control"
            placeholder="Put A Correct Hospital Name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor ID</label>
          <input
            ref={ID}
            type="text"
            className="form-control"
            placeholder="Only for authurization "
          />
        </div>

        <button type="button" onClick={onClick} className="btn btn-primary">
          Submit
        </button>

        <figcaption style={{ margin: 20 }} className="blockquote-footer">
          note: if somthing you do not want update keep it empty
        </figcaption>
      </div>
    </div>
  );
}

export default EditDoctor;
