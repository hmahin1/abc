import { GET_ERRORS } from '../constants/action-types';
import M from "materialize-css";

const initialState = {};

const errorReducer = (state = initialState, action)  => {
  switch (action.type) {
    case GET_ERRORS:
      return M.toast({ html: action.payload, classes: "red darken-3" });
    default:
      return state;
  }
}

export default errorReducer;