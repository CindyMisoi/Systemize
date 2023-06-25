import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import RegisterPage from "./RegisterPage";

const LandingRoutes = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<LoginPage/>}/>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
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
