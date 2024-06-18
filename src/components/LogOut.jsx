import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

const LogOut = () => {
  const { setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    localStorage.clear();
    navigate("/logg-inn");
  });

  return <div></div>;
};

export default LogOut;
