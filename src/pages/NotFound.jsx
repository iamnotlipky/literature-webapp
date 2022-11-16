import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="h-100 margin-middle text-center">
          <h1 className="text-light display-1 fw-bold">404</h1>
          <h1 className="text-light display-1 fw-bold mb-3">Page Not Found</h1>
          <button className="btn btn-danger fw-semibold" onClick={() => navigate("/")}>
            Back To Home
          </button>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
