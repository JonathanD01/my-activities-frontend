import React, { useContext, useEffect } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

const Home = () => {
  const navigate = useNavigate();

  const { token } = useContext(TokenContext);
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (isExpired) {
      localStorage.clear();
      navigate("/logg-inn");
    }
  }, [decodedToken]);

  return (
    <div className="container container--fluid">
      <section className="hero">
        <div className="content">
          <h1 className="title font-bold">Mine Aktiviteter</h1>

          <p className="text">
            Se hvilke kommende aktiviteter du har! Aldri gå glipp av et møte,
            oppdrag, gjøremål eller noe annet igjen!
          </p>
          <div className="mt-5 text-center">
            <a
              href="/mine-aktiviteter"
              className="button button__larger button__success"
            >
              Kom i gang
            </a>
          </div>
        </div>
        <div className="img-container">
          <img src="showcase_2.png" draggable="false" />
        </div>
      </section>
    </div>
  );
};

export default Home;
