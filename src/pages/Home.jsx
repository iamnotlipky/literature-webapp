import * as React from "react";
import logoImg from "../assets/img/logo.png";
import bookImg from "../assets/img/book.png";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

const Home = () => {
  const [modalLogin, setModalLogin] = React.useState(false);
  const [modalRegister, setModalRegister] = React.useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Navbar variant="dark" className="bg-page py-3" fixed="top">
        <Container>
          <Navbar.Brand className="cursor-pointer" onClick={() => navigate("/")}>
            <img src={logoImg} height={35} className="d-inline-block align-top" alt="logo-img" />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <section className="margin-top bg-page vh-100">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-lg-6 col-md-6 col-12 order-lg-1 order-2">
              <h1 className="title fw-bold text-light display-2">source of intelligence</h1>
              <h4 className="text-light my-lg-4 my-3 text-justify">Sign-up and receive unlimited accesss to all of your literatur - share your literature.</h4>
              <button className="btn btn-danger text-white fw-semibold w-btn me-3" onClick={() => setModalRegister(true)}>
                Sign Up
              </button>
              <button className="btn btn-light text-dark fw-semibold w-btn" onClick={() => setModalLogin(true)}>
                Sign In
              </button>
            </div>
            <div className="col-lg-6 col-md-6 col-12 order-lg-2 order-1 mb-lg-0 mb-3">
              <img src={bookImg} alt="book-img" width="100%" />
            </div>
          </div>
        </div>
      </section>
      <Login modalLogin={modalLogin} setModalLogin={setModalLogin} setModalRegister={setModalRegister} />
      <Register modalRegister={modalRegister} setModalRegister={setModalRegister} setModalLogin={setModalLogin} />
    </>
  );
};

export default Home;
