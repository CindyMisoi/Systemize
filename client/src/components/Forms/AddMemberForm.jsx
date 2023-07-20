import React, { useEffect, useState } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";

const AddMemberForm = ({ teamId, clickClose, setTeamUsers }) => {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const getAllUsers = async () => {
    try {
    const res = await apiServer.get("/users");
    setUsers(res.data);
    console.log(res.data);
    setLoading(false);
    } catch (err) {
      console.error("Error getting users", err);
      setLoading(false);
    }
  };

  const onSubmit = async ({ userId }) => {
    try {
      await apiServer.post(`/teams/${teamId}/user/${userId}`);
      const res = await apiServer.get(`/teams/${teamId}`);
      setTeamUsers(res.data.users);
      // console.log(res.data.users);
      clickClose();
    } catch (err) {
      console.error("User already on team", err);
    }

    // const res = await apiServer.get(`/projects/${projectId}/tasklists`);
  };

  useEffect(() => {
    console.log("useEffect is triggered");
    getAllUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const renderedUsers = users.map((user, i) => {
    return (
      <option key={i} id={user.id} value={user.id}>
        {user.name} - {user.email}
      </option>
    );
  });
  return (
    <div>
      <Button onClick={openModal}>Open modal</Button>
      <Modal open={open} onClose={closeModal}>
        <div className="tasklist-modal-container" style={{ minWidth: "auto" }}>
          <form
            className="task-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="form-header">Add a member to the team!</h2>
            <div className="form-top-container">
              <div className="form-top-left">
                <label className="form-label">
                  <select
                    id="user-select"
                    name="userId"
                    className="form-input"
                    onChange={() => setError("")}
                    {...register("userId",{required: true})}
                  >
                    <option value={0}>{"<---Choose user--->"}</option>
                    {renderedUsers}
                  </select>
                  <div className="error-message">{error}</div>
                  {errors.projectId?.type === "required" && (
                    <p className="error-message">Please choose a user to add</p>
                  )}
                </label>
              </div>
              <div className="form-top-middle"></div>
              <div className="form-top-right"></div>
            </div>

            <div style={{ display: "flex", marginLeft: "160px" }}>
              <Button
                style={{ color: "#0093ff" }}
                onClick={closeModal}
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

export default AddMemberForm;