import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { createTeam } from "../../redux/actions/TeamActions";
import "../../css/Forms.css";

const TeamForm = ({ handleNewClose, clickClose, open }) => {
  const {handleSubmit} = useForm();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const onSubmit = ({ name, description }) => {
    dispatch(createTeam(userId, name, description));
    clickClose();
  };

  return (
    <div>
      <Modal open={open} onClose={clickClose}>
        <div className="modal-container">
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-header">Create a Team</h2>
            <div className="form-top-container">
              <div className="form-top-left">
                <label className="form-label">
                  Team Name
                  <input
                    name="name"
                    type="text"
                    placeholder={"Team Name"}
                    className="form-input"
                  ></input>
                  {!name && (
                    <p className="error-message">Please enter a team name</p>
                  )}
                </label>
              </div>
              <div className="form-top-middle"></div>
              {/* <div
                className="form-top-right"
                style={{ alignSelf: "normal" }}
              ></div> */}
            </div>
            <div>
              <textarea
                name="description"
                type="text"
                placeholder={"Team Description"}
                className="edit-task-description textarea"
              ></textarea>
            </div>
            <div style={{ display: "flex", marginLeft: "400px" }}>
              <Button
                style={{ color: "#0093ff" }}
                onClick={clickClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                style={{ color: "#0093ff" }}
                type="submit"
                color="primary"
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TeamForm;