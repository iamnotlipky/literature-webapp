import * as React from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import logoImg from "../assets/img/logo.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Guest = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <section className="margin-middle bg-page">
        <Container>
          <div className="d-grid justify-content-center">
            <div className="mx-auto">
              <img src={logoImg} alt="logo-img" width="100%" className="mb-3" />
            </div>
            <div className="mx-auto w-100">
              <div className="d-flex justify-content-center">
                <button className="btn btn-danger text-white w-50" onClick={() => navigate("/search")}>
                  <span className="fs-6 fw-semibold text-center">Find Literatures</span> <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Guest;
