import * as React from "react";
import Navigation from "../components/Navigation";
import defaultImg from "../assets/img/default.jpg";
import { IoMailOutline } from "react-icons/io5";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import exampleImg from "../assets/img/example.png";
import { Container } from "react-bootstrap";
import { API } from "../config/API";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Edit from "../components/Edit";

const Profile = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const [user, setUser] = React.useState(null);
  const [literature, setLiterature] = React.useState([]);
  const navigate = useNavigate();
  const [modalEdit, setModalEdit] = React.useState(false);

  const getUser = async () => {
    const response = await API.get(`/user/${state.user.id}`);
    setUser(response.data.data);
  };

  const getLiterature = async () => {
    const response = await API.get(`/literatureUser/${state.user.id}`);
    setLiterature(response.data.data);
  };

  React.useEffect(() => {
    getUser();
    getLiterature();
  }, [state, user]);

  return (
    <>
      <Navigation />
      <section className="bg-page margin-top">
        <Container>
          <h2 className="text-white fw-bold mb-3 title">Profile</h2>
          <div className="row bg-gray p-3 rounded mx-lg-0 mx-3 mb-5">
            <div className="col-lg-6 col-12 order-lg-1 order-2 mx-lg-0 mx-2">
              <div className="d-flex align-items-center mb-3">
                <div className="display-5 text-white mb-3">
                  <IoMailOutline className="text-red" />
                </div>
                <div className="ms-3">
                  <h6 className="fw-bold text-white">Email</h6>
                  <h6 className="text-white fw-light">{user?.email}</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="display-5 text-white mb-3">
                  <IoMaleFemaleOutline className="text-red" />
                </div>
                <div className="ms-3">
                  <h6 className="fw-bold text-white">Gender</h6>
                  <h6 className="text-white fw-light">{user?.gender}</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="display-5 text-white mb-3">
                  <IoCallOutline className="text-red" />
                </div>
                <div className="ms-3">
                  <h6 className="fw-bold text-white">Phone</h6>
                  <h6 className="text-white fw-light">{user?.phone}</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="display-5 text-white mb-3">
                  <IoLocationOutline className="text-red" />
                </div>
                <div className="ms-3">
                  <h6 className="fw-bold text-white">Address</h6>
                  <h6 className="text-white fw-light">{user?.address}</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12 order-lg-2 order-1 mb-lg-0 mb-3 d-flex align-items-center">
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <img src={user?.image === "http://localhost:5000/uploads/" ? defaultImg : user?.image} alt="default-img" className="profile-img w-75" />
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <button className="btn btn-danger w-75 mt-3 fw-bold" onClick={() => setModalEdit(true)}>
                    Change Photo Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-white fw-bold my-3 title">My Literature</h2>
          <div className="row">
            {literature.length == 0 ? (
              <>
                <div className="d-grid justify-content-center align-items-center">
                  <h2 className="text-light text-center margin-top">Empty Literature</h2>
                  <button className="btn btn-danger w-100 mb-5" onClick={() => navigate("/addLiterature")}>
                    Create Literature
                  </button>
                </div>
              </>
            ) : (
              <>
                {literature?.map((item) => (
                  <div className="col-lg-3 col-6 mb-5" key={item?.id}>
                    <img src={exampleImg} alt="example-img" width="100%" />
                    <h5 className="fw-bold text-white mt-3">{item?.title}</h5>
                    <h6 className="text-light fw-light">
                      <span className="float-start">{item?.author}</span>
                      <span className="float-end">{item?.publication_date}</span>
                    </h6>
                  </div>
                ))}
              </>
            )}
          </div>
        </Container>
      </section>
      <Edit modalEdit={modalEdit} setModalEdit={setModalEdit} />
    </>
  );
};

export default Profile;
