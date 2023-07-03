import React, { useContext, useState } from "react";
import AuthContext from "../../redux/AuthContext";
import "../../css/LoginPage.css";
import { useNavigate } from "react-router";
import apiServer from "../../config/apiServer";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth, setEmail, setUserId, setUser } = useContext(AuthContext);
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate form data, check if email and password are not empty
    if (!formEmail || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await apiServer.post("/login", { email: formEmail, password });

      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("token", res.data.token);
      setErrorMessage("");
      setAuth(res.data.token);
      // setUserId(res.data.id);
      // setEmail(res.data.email);
      // setUser(res.data);
      navigate("/homepage")
    } catch (err) {
      setLoading(false);
      setErrorMessage("The provided credentials were invalid");
    }
  };

  const handleEmailChange = (e) => {
    setFormEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDemoLoading(true);

    const email = "demo@email.com";
    const password = "password123";

    try {
      const res = await apiServer.post("/login", { email, password });

      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("token", res.data.token);
      setErrorMessage("");
      setAuth(res.data.token);
      setUserId(res.data.id);
      setEmail(res.data.email);
      setUser(res.data);
      navigate("/homepage")
    } catch (err) {
      setLoading(false);
      console.log(err.status);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <form className="login-page--form" onSubmit={onSubmit}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          value={formEmail}
          onChange={handleEmailChange}
        />
        {!formEmail && (
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
          value={password}
          onChange={handlePasswordChange}
        />
        {!password && (
          <p style={{ color: "red", margin: "1px" }}>Please enter a password</p>
        )}
      </div>
      <button type="submit">{loading ? "Logging in.." : "Login"}</button>
      {errorMessage ? (
        <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
      ) : null}
       <button onClick={demoLogin}>
        {demoLoading ? "Logging in as demo user" : "Demo User"}
      </button>
    </form>
  );
};
export default LoginForm;