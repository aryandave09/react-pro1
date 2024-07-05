import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  const accessToken = useSelector((state) => state.form.accessToken);

  if (accessToken) {
    return <Navigate to="/read" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Main;
