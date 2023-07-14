import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import "../../css/LoginPage.css";
import { useNavigate } from "react-router";
import apiServer from "../../config/apiServer";

const LoginForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const {setAuth, setEmail, setUserId, setUser } = useContext(AuthContext);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate form data, check if email and password are not empty
    if (!email) {
      setErrorMessage("Please enter your email");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      // Send the login request to the server to validate credentials and generate session session_token
      const res = await apiServer.post("/login", { email: email, password });
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("userId", res.data.id);
      sessionStorage.setItem("session_token", res.data.session_token);
      sessionStorage.setItem('user', JSON.stringify(res.data));
      setErrorMessage("");
      setAuth(res.data.session_token);
      setUserId(res.data.id);
      setEmail(res.data.email);
      setUser(res.data);
      navigate("/homepage");
    } catch (err) {
      setLoading(false);
      setErrorMessage("The provided credentials were invalid");
    }
  };

  const handleEmailChange = (e) => {
    setemail(e.target.value);
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
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("userId", res.data.id);
      sessionStorage.setItem("session_token", res.data.session_token);
      setErrorMessage("");
      setAuth(res.data.session_token);
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
    <form className="login-page--form" onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          {...register("email",{required: true})}
        />
       {errors.email?.type === "required" && (
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
          {...register("password",{required: true})}
        />
         {errors.password?.type === "required" && (
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
