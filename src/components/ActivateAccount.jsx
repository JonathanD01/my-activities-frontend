import React, { useContext, useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import { activateAccount } from "../services/UserService";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "../App";
import { useNavigate } from "react-router-dom";

const ActivateAccount = () => {
  const { token } = useContext(TokenContext);
  const [errorMessages, setErrorMessages] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const codeLength = 4;

  const props = {
    inputStyle: {
      margin: "10px",
      width: "60px",
      fontSize: "30px",
      height: "60px",
      textAlign: "center",
    },
  };

  async function handleCodeChange(code) {
    if (!code || code.length !== codeLength) {
      return;
    }

    setLoading(true);
    setErrorMessages(null);
    setShowSuccessMessage(false);

    try {
      await activateAccount(code);
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
    <div className="container container--form text-center">
      <Helmet>
        <title>MIAK - Aktiver bruker</title>
      </Helmet>

      <div>
        <h1>Aktiver din bruker</h1>
        <p>Skriv inn koden som du fikk fra eposten!</p>

        {loading && <FontAwesomeIcon icon={faSpinner} className="spinner" />}

        {showSuccessMessage && (
          <p style={{ color: "green" }} className="text-center">
            Brukeren er aktivert!{" "}
            <a href="/logg-inn">Gå her for å logge inn!</a>
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

        <ReactCodeInput
          type="number"
          fields={codeLength}
          onChange={handleCodeChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default ActivateAccount;
