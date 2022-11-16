import * as React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import defaultImg from "../assets/img/default.jpg";
import { IoLogOutOutline } from "react-icons/io5";
import { UserContext } from "../context/userContext";
import { API } from "../config/API";

const Navigation = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    const response = await API.get(`/user/${state.user.id}`);
    setUser(response.data.data);
  };

  React.useEffect(() => {
    getUser();
  }, [state]);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <>
      {state.user?.role == "Guest" ? (
        <Navbar expand="lg" variant="dark" fixed="top" className="bg-page py-3">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="" onClick={() => navigate("/search")}>
                  Literature
                </Nav.Link>
                <Nav.Link className="" onClick={() => navigate("/profile")}>
                  Profile
                </Nav.Link>
                <Nav.Link className="" onClick={() => navigate("/collection")}>
                  My Collection
                </Nav.Link>
                <Nav.Link className="" onClick={() => navigate("/addLiterature")}>
                  Add Literature
                </Nav.Link>
                <Nav.Link className="" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Brand className="ms-auto cursor-pointer" onClick={() => navigate("/guest")}>
              <img src={logoImg} height={35} className="d-inline-block align-top" alt="logo-img" />
            </Navbar.Brand>
          </Container>
        </Navbar>
      ) : (
        <Navbar variant="dark" fixed="top" className="bg-page py-3">
          <Container>
            <Navbar.Brand>
              <img src={logoImg} height={35} className="d-inline-block align-top click" alt="logo-img" />
            </Navbar.Brand>
            <Nav className="ms-auto">
              <img src={defaultImg} height={35} className="user-img d-inline-block align-top click" alt="user-img" />
              <NavDropdown id="basic-nav-dropdown" align="end">
                <NavDropdown.Item className="bg-grey" onClick={handleLogout}>
                  <IoLogOutOutline className="text-danger fs-2" /> <span className="fw-semibold">Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Navigation;
