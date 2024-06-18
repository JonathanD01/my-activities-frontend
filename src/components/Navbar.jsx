import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useColorScheme } from "./useColorScheme";
import { useJwt } from "react-jwt";
import { TokenContext } from "../App";

const Navbar = () => {
  const { isDark, setIsDark } = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);

  const { token } = useContext(TokenContext);
  const { decodedToken, isExpired } = useJwt(token);

  function toggleSidebar() {
    setIsOpen(!isOpen);
    const sidebarElement = document.getElementById("sidebar");
    const currentDisplay = sidebarElement.style.display;

    if (!currentDisplay || currentDisplay === "none") {
      sidebarElement.style.display = "block";
    } else {
      sidebarElement.style.display = "none";
    }
  }

  useEffect(() => {}, [token]);

  return (
    <header>
      <nav aria-label="primary">
        <div className="content container--lg navbar">
          <div>
            <a className="logo" href="/">
              <img id="logo" src="/favicon_io/favicon.ico" />
            </a>
          </div>
          <div>
            <ul className="navbar-links">
              <li>
                <a href="/">
                  <span>Hjem</span>
                </a>
              </li>

              {!decodedToken && (
                <li>
                  <a href="/logg-inn">
                    <span>Logg inn</span>
                  </a>
                </li>
              )}

              {!decodedToken && (
                <li>
                  <a href="/registrer-bruker">
                    <span>Registrer deg</span>
                  </a>
                </li>
              )}

              {decodedToken && !isExpired && (
                <li>
                  <a href="/mine-aktiviteter">
                    <span>Aktiviteter</span>
                  </a>
                </li>
              )}

              {decodedToken && !isExpired && (
                <li>
                  <a href="/logg-ut">
                    <span>Logg ut</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <ul className="navbar-links">
              <li className="mr-1">
                {decodedToken && decodedToken.fullName && (
                  <span>Hei {decodedToken.fullName}</span>
                )}
              </li>
              <li>
                <button
                  className="button button__secondary"
                  onClick={() => setIsDark(!isDark)}
                >
                  {isDark ? "Lys" : "Mørk"} Modus
                </button>
              </li>
            </ul>
          </div>
          <button id="menu-icon" onClick={() => toggleSidebar()}>
            {isOpen ? (
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            )}
          </button>
        </div>
        <aside id="sidebar" className="content container container-lg sidebar">
          <ul className="sidebar-links">
            <li>
              <a href="/">
                <span>Hjem</span>
              </a>
            </li>
            {!decodedToken && (
              <li>
                <a href="/logg-inn">
                  <span>Logg inn</span>
                </a>
              </li>
            )}

            {!decodedToken && (
              <li>
                <a href="/registrer-bruker">
                  <span>Registrer deg</span>
                </a>
              </li>
            )}

            {decodedToken && !isExpired && (
              <li>
                <a href="/mine-aktiviteter">
                  <span>Aktiviteter</span>
                </a>
              </li>
            )}

            {decodedToken && !isExpired && (
              <li>
                <a href="/logg-ut">
                  <span>Logg ut</span>
                </a>
              </li>
            )}
            <li>
              <button
                className="button button__secondary"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? "Lys" : "Mørk"} Modus
              </button>
            </li>
          </ul>
        </aside>
      </nav>
    </header>
  );
};

export default Navbar;
