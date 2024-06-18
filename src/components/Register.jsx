import React, { useContext, useEffect, useState } from "react";
import { register } from "../services/UserService";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "../App";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { token } = useContext(TokenContext);
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
    setShowSuccessMessage(false);

    try {
      await register(inputs);
      setShowSuccessMessage(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors);
      } else {
        setErrorMessages([
          {
            message: error.message,
          },
        ]);
      }
      setShowSuccessMessage(false);
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
        <title>MIAK - Registrer bruker</title>
      </Helmet>

      <div>
        <h1 className="text-center">BLI MEDLEM</h1>
        <p className="text-center">
          Med en profil er du med i Aktivitetsklubben!
        </p>

        {loading && <FontAwesomeIcon icon={faSpinner} className="spinner" />}

        {showSuccessMessage && (
          <p style={{ color: "green" }} className="text-center">
            Flott! Vennligst sjekk eposten vi har sendt deg!
          </p>
        )}

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
              <span style={{ color: "crimson" }}>*</span>Fornavn
            </small>
            <input type="text" name="firstname" onChange={handleChange} />
          </div>
          <div className="mt-1">
            <small>
              <span style={{ color: "crimson" }}>*</span>Etternavn
            </small>
            <input type="text" name="lastname" onChange={handleChange} />
          </div>
          <div className="mt-1">
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
              Registrer medlem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
