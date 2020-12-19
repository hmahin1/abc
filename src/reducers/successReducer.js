import { SUCCESS_MESSAGE } from '../constants/action-types';
import M from "materialize-css";

const initialState = {};

const successMessageReducer = (state = initialState, action)  => {
  switch (action.type) {
    case SUCCESS_MESSAGE:
      return M.toast({ html: action.payload, classes: "green darken-3" });
    default:
      return state;
  }
}

export default successMessageReducer;