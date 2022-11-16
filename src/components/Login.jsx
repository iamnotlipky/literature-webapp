import * as React from "react";
import { Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/API";

const Login = ({ modalLogin, setModalLogin, setModalRegister }) => {
  const [message, setMessage] = React.useState(null);
  const [state, dispatch] = React.useContext(UserContext);

  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
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

      const data = await API.post("/login", form);

      const alert = (
        <Alert variant="success" className="py-2">
          Login Success!
        </Alert>
      );

      setMessage(alert);

      let payload = data.data.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
      navigate("/guest");
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-2">
          Wrong Email or Password!
        </Alert>
      );

      setMessage(alert);
    }
  });

  return (
    <>
      <Modal show={modalLogin} onHide={() => setModalLogin(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="modal-body bg-dark rounded">
          <h2 className="mb-4 text-white fw-bold">Sign In</h2>
          {message && message}
          <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="mb-3">
              <input type="email" className="form-control form-me" id="email" placeholder="Email" name="email" value={form.email} onChange={handleOnChange} />
            </div>
            <div className="mb-4">
              <input type="password" className="form-control form-me" id="password" placeholder="Password" name="password" value={form.password} onChange={handleOnChange} />
            </div>
            <button type="submit" className="btn btn-danger text-light fw-semibold w-100 mb-4">
              Sign In
            </button>
          </form>
          <p className="text-center text-light">
            Don't have an account ? Click{" "}
            <span
              className="click-here fw-bold"
              onClick={() => {
                setModalRegister(true);
                setModalLogin(false);
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

export default Login;
