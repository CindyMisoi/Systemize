import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "../../css/LoginPage.css";
import apiServer from "../../config/apiServer";
import { useNavigate } from "react-router";
import { MdKeyboardBackspace } from "react-icons/md";

const RegisterPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const { setAuth, setUserId, setEmail, setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await apiServer.post("/register", { name, email, password });
      sessionStorage.setItem("onboard", res.data.session_token);
      sessionStorage.setItem("email", res.data.user.email);
      sessionStorage.setItem("userId", res.data.user.id);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      setAuth(res.data.session_token);
      console.log(res.data.session_token);
      setEmail(res.data.user.email);
      console.log(res.data.user.email);
      setUserId(res.data.user.id);
      console.log(res.data.user.id);
      setUser(res.data.user)
      console.log(res.data.user);
      setLoading(false);
      navigate("/register/onboard");
    } catch (err) {
      setLoading(false);
      setErrorMessage("Something went wrong with registering");
    }
  };

  return (
        <div className="register-page-container">
          <div className="register-page-header">
            <a href="/">
              <img src={logo} alt="logo" style={{ width: "70px" }} />
            </a>
            <h1
              style={{
                fontWeight: "500",
                marginBottom: "10px",
                marginTop: "1px",
                fontSize: "24px",
              }}
            >
              Welcome to Methodize!
            </h1>
            <h1
              style={{
                fontWeight: "500",
                marginBottom: "20px",
                marginTop: "1px",
                fontSize: "20px",
              }}
            >
              First things first, let's set up your account...
            </h1>
          </div>
          <div>
            <a href="/" style={{ textDecoration: "none" }}>
              <div style={{ marginRight: "225px", display: "flex" }}>
                <div style={{ display: "flex", marginTop: "3px" }}>
                  <MdKeyboardBackspace />
                </div>
                <div>
                  <p style={{ margin: "0", fontSize: "14px" }}>back to home page</p>
                </div>
              </div>
            </a>
          </div>
          <form className="register-page--form" onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="name">Full Name</label>
              <input
                name="name"
                placeholder="John Doe"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p style={{ color: "red", margin: "1px" }}>
                  Please enter your full name
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                name="email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p style={{ color: "red", margin: "1px" }}>
                  Please enter an email address
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p style={{ color: "red", margin: "1px" }}>
                  Please enter a password
                </p>
              )}
            </div>
            <button type="submit">{loading ? "Registering.." : "Register"}</button>
            {errorMessage && (
              <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
            )}
          </form>
          <div className="login-container">
            Already a user?{" "}
            <a style={{ textDecoration: "none", color: "blue" }} href="/login">
              Click here to login
            </a>
          </div>
        </div>
      );
};

export default RegisterPage;

