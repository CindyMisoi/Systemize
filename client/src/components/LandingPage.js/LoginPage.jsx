import React from "react";
import logo from "../../assets/logo.png";
import "../../css/LoginPage.css";
import LoginForm from "../../components/Forms/LoginForm";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-page-header">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: "70px" }} />
        </Link>
        <h1
          style={{
            fontWeight: "500",
            marginBottom: "20px",
            marginTop: "1px",
            fontSize: "24px",
          }}
        >
          Welcome Back!{" "}
        </h1>
      </div>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ marginRight: "225px", display: "flex" }}>
            <div style={{ display: "flex", marginTop: "3px" }}>
              <MdKeyboardBackspace />
            </div>
            <div>
              <p style={{ margin: "0", fontSize: "14px" }}>back to home page</p>
            </div>
          </div>
        </Link>
      </div>
      <LoginForm />

      <div className="register-container">
        Not a user?{" "}
        <Link style={{ textDecoration: "none", color: "blue" }} to="/register">
          Click here to sign up
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
