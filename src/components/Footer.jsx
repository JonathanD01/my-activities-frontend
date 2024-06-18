import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p
        style={{
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Build {process.env.NODE_ENV}. A demo project&nbsp;
        <Link
          to={"https://github.com/JonathanD01/my-activities-frontend/"}
          target="_blank"
        >
          (https://github.com/JonathanD01/my-activities-frontend/)
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
