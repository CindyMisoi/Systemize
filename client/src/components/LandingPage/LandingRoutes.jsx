import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import RegisterPage from "./RegisterPage";
import Onboard from "./Onboard";

const LandingRoutes = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route exact path="/register/onboard"  element={<Onboard/>} />
        <Route exact path="/" element={<LandingPage/>} />
        <Route
          path="/*"
          render={() => {
            return <Redirect to="/" />;
          }}
        />
      </Routes>
   </BrowserRouter>
  );
};

export default LandingRoutes;
