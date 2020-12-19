import { GET_ALL_CAPTAINS_SUCCESS, GET_ALL_CAPTAINS_ERROR,GET_ALL_POSTS, 
    GET_MY_POSTS, POST_LIKE_SUCCESS, POST_UNLIKE_SUCCESS,
    GET_ALL_TEAMS_SUCCESS,GET_ALL_TEAMS_ERROR } from "../constants/action-types";
import { request } from "../http-helper";

export const getAllPosts = () => {
    return (dispatch) => {
        return request("/allpost", "get", "", true).then((res) => {
            const { data } = res;
            dispatch({ type: GET_ALL_POSTS, payload: data });
        });
    };
};

export const getMyPosts = () => {
    return (dispatch) => {
        return request("/mypost", "get", "", true).then((res) => {
            dispatch({ type: GET_MY_POSTS, payload: res.data });
        });
    };
};

export const likePost = (id) => {
    const body = {
        postId: id,
    }
    return (dispatch) => {
        return request("/like", "put", body, true).then((res) => {
            dispatch({ type: POST_LIKE_SUCCESS, payload: res.data });
        });
    };
}
export const unlikePost = (id) => {
    const body = {
        postId: id,
    }
    return (dispatch) => {
        return request("/unlike", "put", body, true).then((res) => {
            dispatch({ type: POST_UNLIKE_SUCCESS, payload: res.data });
        })
        .catch(error => dispatch({ type: GET_ALL_CAPTAINS_ERROR, payload: error }));
    };
}

export const getAllCaptains = () => {
    return (dispatch) => {
        return request("/captains", "get", "", false).then((res) => {
            const { data } = res;
            dispatch({ type: GET_ALL_CAPTAINS_SUCCESS, payload: res.data });
        }).catch(error => dispatch({ type: GET_ALL_CAPTAINS_ERROR, payload: error }));
    };
};

export const getAllTeams = () => {
    return (dispatch) => {
        return request("/teams", "get", "", false).then((res) => {
            const { data } = res;
            dispatch({ type: GET_ALL_TEAMS_SUCCESS, payload: res.data });
        }).catch(error => dispatch({ type: GET_ALL_TEAMS_ERROR, payload: error }));
    };
};