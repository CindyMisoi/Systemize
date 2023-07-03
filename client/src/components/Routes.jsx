import React from "react";
import { useSelector } from "react-redux";
import LandingRoutes from "./LandingPage/LandingRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes = () => {
  const auth = useSelector((state) => state.auth);

  // If there is auth, load separate auth component that includes Login, signup, landing.
  // Alternatively, you can render the auth component in each route.
  return <>{auth ? <AuthRoutes /> : <LandingRoutes />}</>;
};

export default Routes;
