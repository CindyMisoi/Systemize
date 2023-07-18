import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiServer from "../../config/apiServer";
import { useForm } from "react-hook-form";
import "../../css/LoginPage.css";

const Onboard = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setAuth } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");

  const onboard = async ({ name }) => {
    const email = sessionStorage.getItem("email");
    if (name) {
      try {
        const res = await apiServer.put("/register/onboard", {
          email,
          name,
        });
        sessionStorage.setItem("session_token", res.data.session_token);
        setErrorMessage("");
        sessionStorage.setItem("email", res.data.email);
        setAuth(res.data.session_token);
      } catch (err) {
        console.log(err.status);
        setErrorMessage("Something went wrong");
      }
    }
  };

  const onSkip = () => {
    sessionStorage.setItem("session_token", sessionStorage.getItem("onboard"));
    setAuth(sessionStorage.getItem("onboard"));
    sessionStorage.removeItem("onboard");
  };

  return (
    <div className="onboard-page-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <div className="onboard-page-header">
          <h1
            style={{
              fontWeight: "500",
              marginBottom: "20px",
              marginTop: "1px",
              fontSize: "24px",
            }}
          >
            What team will you be working on?
          </h1>
        </div>
        <form className="onboard-page-form" onSubmit={handleSubmit(onboard)}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="teamName">Team Name</label>
            <input
              name="name"
              {...register("name", { minLength: 2 })}
              type="text"
            />
            {errors.name?.type === "minLength" && (
              <p style={{ color: "red", margin: "1px" }}>
                Team name must be greater than 1 character
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{
                width: "150px",
                border: "1px solid #0093ff",
                backgroundColor: "transparent",
                borderRadius: "5px",
                color: "black",
                outline: "none",
                cursor: "pointer",
              }}
              onClick={onSkip}
              type="button"
            >
              Skip
            </button>
            <button style={{ width: "150px" }} type="submit">
              Continue
            </button>
          </div>
          {errorMessage && (
            <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Onboard;
