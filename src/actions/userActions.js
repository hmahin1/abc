import {
  LOGIN_SUCCESS,
  GET_ERRORS,
  SUCCESS_MESSAGE,
  LOGUT_SUCCESS
} from "../constants/action-types";
import { request } from "../http-helper";
import jwt_decode from "jwt-decode";

export const setCurrentUser = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};

export const loginUser = (userData, history) => {
  return (dispatch) => {
    return request("/signin", "post", userData).then((res) => {
      const { error, message } = res;
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      } else {
        dispatch({ type: SUCCESS_MESSAGE, payload: message });
        localStorage.setItem("token", res.token);
        dispatch(setCurrentUser(res.user));
        history.push("/");
      }
    });
  };
};

export const getUserData = () => {
  return (dispatch) => {
    return request("/user", "get", "", true).then((res) => {
      dispatch(setCurrentUser(res.data));
    });
  }
}

export const logoutAction = (history) => {
  localStorage.removeItem("token");
  history.push('/login');
  return { type: LOGUT_SUCCESS };
};
