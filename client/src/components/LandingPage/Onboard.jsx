import React, { useContext, useState } from "react";
import {AuthContext} from "../../context/AuthContext";
import apiServer from "../../config/apiServer";
import { useForm } from "react-hook-form";
import "../../css/LoginPage.css";

const Onboard = (props) => {
  const { register, handleSubmit } = useForm();
  const { setUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  // name for team
  const onboard = async ({ name }) => {
    const email = sessionStorage.getItem("email");
    if (name) {
      try {
        const res = await apiServer.put("/register/onboard", {
          email,
          name,
        });
        //sets initial user
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setErrorMessage("");
        //for Refresh
        // console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err.status);
        setErrorMessage("Something went wrong");
      }
    }
  };

  const onSkip = () => {
    //sets initial token
    sessionStorage.setItem("user", sessionStorage.getItem("onboard"));
    //for component to refresh to redirect webpage
    setUser(sessionStorage.getItem("onboard"));
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
        <form className="onboard-page--form" onSubmit={handleSubmit(onboard)}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="teamName">Team Name</label>
            <input name="name" {...register("name", { minLength: 2 })}></input>
            {/* {errors.name?.type === "minLengh" && (
              <p style={{ color: "red", margin: "1px" }}>
                Team name must be greater than 1 character
              </p>
            )} */}
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
            >
              Skip
            </button>
            <button
              style={{
                width: "150px",
              }}
              type="submit"
            >
              Continue
            </button>
          </div>
          {errorMessage ? (
            <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Onboard;