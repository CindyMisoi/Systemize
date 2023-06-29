import React, { createContext, useReducer } from "react";
import Reducer from "../reducer/TeamReducer";

const initialState = {
  teams: [
 {   
"id": 1,
"name": "Engineering",
"description": "This is the engineering team",
"created_at": "2023-06-28T18:15:54.022Z",
"updated_at": "2023-06-28T18:15:54.022Z"
},
{
"id": 2,
"name": "Marketing",
"description": "This is the marketing team",
"created_at": "2023-06-28T18:15:54.025Z",
"updated_at": "2023-06-28T18:15:54.025Z"
},
{
"id": 3,
"name": "Sales",
"description": "This is the marketing team",
"created_at": "2023-06-28T18:15:54.029Z",
"updated_at": "2023-06-28T18:15:54.029Z"
}
  ],
};

const TeamStore = ({ children }) => {
  const [teamState, teamdispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[teamState, teamdispatch]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default TeamStore;