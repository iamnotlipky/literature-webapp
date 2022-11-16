import { Routes, Route, useNavigate } from "react-router-dom";
import Search from "./pages/Search";
import Guest from "./pages/Guest";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Collection from "./pages/Collection";
import AddLiterature from "./pages/AddLiterature";
import Detail from "./pages/Detail";
import Owner from "./pages/Owner";
import NotFound from "./pages/NotFound";
import * as React from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/API";
import PrivateRoute from "./components/PrivateRoute";
import DetailCollection from "./pages/DetailCollection";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [state, dispatch] = React.useContext(UserContext);

  React.useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin == false && !isLoading) {
      navigate("/");
    } else {
      if (state.user.role == "Owner") {
        navigate("/owner");
      } else if (state.user.role == "Guest") {
        navigate("/guest");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/check-auth");

      const payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Routes>
          <Route exac path="/" element={<Home />} />
          <Route exac path="/" element={<PrivateRoute />}>
            <Route exac path="/search" element={<Search />} />
            <Route exac path="/guest" element={<Guest />} />
            <Route exac path="/profile" element={<Profile />} />
            <Route exac path="/collection" element={<Collection />} />
            <Route exac path="/addLiterature" element={<AddLiterature />} />
            <Route exac path="/detail/:id" element={<Detail />} />
            <Route exac path="/detailCollection/:id" element={<DetailCollection />} />
            <Route exac path="/owner" element={<Owner />} />
          </Route>
          <Route exac path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
