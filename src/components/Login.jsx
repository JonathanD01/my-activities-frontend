import React, { useContext, useEffect, useState } from "react";
import { authenticate } from "../services/UserService";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

const Login = () => {
  const { token, setToken } = useContext(TokenContext);
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setErrorMessages(null);

    try {
      const response = await authenticate(inputs);

      if (response.status === 200 && response.data.response === "SUCCESS") {
        setToken(response.data.result.token);

        navigate("/mine-aktiviteter");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors);
      } else if (
        error.response &&
        error.response.status &&
        error.response.status === 403
      ) {
        setErrorMessages([
          {
            message: "Pass på at brukernavn og passord er korrekt!",
          },
        ]);
      } else {
        setErrorMessages([
          {
            message: error.message,
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/mine-aktiviteter");
    }
  });

  return (
    <div className="container container--form">
      <Helmet>
        <title>MIAK - Logg inn</title>
      </Helmet>

      <div>
        <h1 className="text-center">LOGG INN</h1>

        {loading && <FontAwesomeIcon icon={faSpinner} className="spinner" />}

        {errorMessages && (
          <>
            <h2 className="text-center">Feil!</h2>
            {errorMessages.map((errorMessage, index) => (
              <p
                key={index}
                style={{ color: "crimson" }}
                className="text-center"
              >
                {errorMessage.message}
              </p>
            ))}
          </>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <small>
              <span style={{ color: "crimson" }}>*</span>E-post
            </small>
            <input type="text" name="email" onChange={handleChange} />
          </div>
          <div className="mt-1">
            <small>
              <span style={{ color: "crimson" }}>*</span>Passord
            </small>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className="mt-3">
            <button type="submit" className="button button__larger w-100">
              Logg inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
