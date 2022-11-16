import * as React from "react";
import { Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/API";

const Edit = ({ modalEdit, setModalEdit }) => {
  const [state, dispatch] = React.useContext(UserContext);
  const [form, setForm] = React.useState({
    image: "",
  });
  const [message, setMessage] = React.useState(null);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);

      const data = await API.patch(`/user/${state.user.id}`, formData);

      console.log("This Data : ", data);
      const alert = (
        <Alert variant="success" className="py-2">
          Edit Profile Success!
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-2">
          Edit Profile Failed!
        </Alert>
      );
      setMessage(alert);
    }
  };

  return (
    <>
      <Modal show={modalEdit} onHide={() => setModalEdit(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="modal-body bg-dark rounded">
          <h2 className="mb-4 text-white fw-bold">Change Photo</h2>
          {message && message}
          <form onSubmit={handleOnSubmit}>
            <div className="input-group mb-3 w-100">
              <input type="file" className="form-control form-me" name="image" onChange={handleOnChange} />
            </div>
            <button type="submit" className="btn btn-danger text-light fw-semibold w-100 mb-4">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Edit;
