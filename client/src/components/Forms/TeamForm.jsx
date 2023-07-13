import React, {useState} from "react";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { Context as TeamContext } from "../../context/store/TeamStore";
import "../../css/Forms.css";

const TeamForm = () => {
  const {handleSubmit} = useForm();
  // const dispatch = useDispatch();
  const [teamState, teamdispatch] = useContext(TeamContext);
  const userId = sessionStorage.getItem("userId");
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };


  const onSubmit = async ({ name, description }) => {
    await apiServer.post(`/teams/user/${userId}`, {
      name,
      description,
    });

    const res = await apiServer.get(`/teams/user/${userId}`);
    await teamdispatch({ type: "update_user_teams", payload: res.data });
    closeModal();
  };
  return (
    <div>
      <Button onClick={openModal}>Open modal</Button>
      <Modal open={open} onClose={closeModal}>
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

export default TeamForm;