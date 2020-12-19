import { GET_ALL_CAPTAINS_SUCCESS, GET_ALL_CAPTAINS_ERROR, GET_ALL_TEAMS_SUCCESS, GET_ALL_TEAMS_ERROR } from "../constants/action-types";

const initialState = {
  captains: undefined,
  teams: undefined,
};

const postReducer = (state = initialState, action) => {
  if (action.type === GET_ALL_CAPTAINS_SUCCESS) {
    return {
      ...state,
      captains: action.payload,
    };
  }
  if (action.type === GET_ALL_CAPTAINS_ERROR) {
    return {
      ...state,
      captains: action.payload,
    };
  }
  if (action.type === GET_ALL_TEAMS_SUCCESS) {
    return {
      ...state,
      teams: action.payload,
    };
  }
  if (action.type === GET_ALL_TEAMS_ERROR) {
    return {
      ...state,
      captains: action.payload,
    };
  }
  return state;
}

export default postReducer;
