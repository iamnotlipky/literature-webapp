import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = React.useContext(UserContext);
  const isLogin = state.isLogin;

  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
