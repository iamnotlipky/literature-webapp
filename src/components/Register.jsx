import * as React from "react";
import { Alert, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/API";

const Register = ({ modalRegister, setModalRegister, setModalLogin }) => {
  const [message, setMessage] = React.useState(null);

  const [form, setForm] = React.useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
    role: "Guest",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);
      console.log(response.data.data);
      const alert = (
        <Alert variant="success" className="py-2">
          Registration Success!
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-2">
          Registration Failed!
        </Alert>
      );
      setMessage(alert);
    }
  });

  return (
    <>
      <Modal show={modalRegister} onHide={() => setModalRegister(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="modal-body bg-dark rounded">
          <h2 className="text-light mb-4 fw-bold">Sign Up</h2>
          {message && message}
          <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="mb-3">
              <input type="email" className="form-control form-me" id="email" placeholder="Email" value={form.email} name="email" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control form-me" id="password" placeholder="Password" value={form.password} name="password" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control form-me" id="fullName" placeholder="Full Name" value={form.fullName} name="fullName" onChange={handleOnChange} />
            </div>
            <div className="select mb-3">
              <select className="form-select form-me" value={form.gender} name="gender" onChange={handleOnChange}>
                <option className="option" value="">
                  Gender
                </option>
                <option className="option" value="Male">
                  Male
                </option>
                <option className="option" value="Female">
                  Female
                </option>
              </select>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control form-me" id="phone" placeholder="Phone" value={form.phone} name="phone" onChange={handleOnChange} />
            </div>
            <div className="mb-4">
              <input type="text" className="form-control form-me" id="address" placeholder="Address" value={form.address} name="address" onChange={handleOnChange} />
            </div>
            <button type="submit" className="btn btn-danger text-light fw-semibold w-100 mb-4">
              Sign Up
            </button>
          </form>
          <p className="text-center text-light">
            Already have an account ? Click{" "}
            <span
              className="click-here fw-bold"
              onClick={() => {
                setModalLogin(true);
                setModalRegister(false);
              }}
            >
              Here
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
