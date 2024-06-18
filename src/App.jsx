import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ActivateAccount from "./components/ActivateAccount";
import Footer from "./components/Footer";
import ActivityPage from "./components/ActivityPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./components/LogOut";
import { createContext, useState } from "react";

export const TokenContext = createContext(null);

function App() {
  const [token, setAppToken] = useState(() => {
    return localStorage.getItem("token", null);
  });

  function setToken(token) {
    setAppToken(token);
    localStorage.setItem("token", token);
  }

  return (
    <>
      <ToastContainer />

      <TokenContext.Provider
        value={{
          token,
          setToken,
        }}
      >
        <Navbar token={token} />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/logg-inn" element={<Login />} />
          <Route path="/logg-ut" element={<LogOut />} />
          <Route path="/registrer-bruker" element={<Register />} />
          <Route path="/aktiver-bruker" element={<ActivateAccount />} />
          <Route path="/mine-aktiviteter" element={<ActivityPage />} />
        </Routes>

        <Footer />
      </TokenContext.Provider>
    </>
  );
}

export default App;
