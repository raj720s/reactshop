import { orderTypes, userTypes } from "../ActionTypes";
import axios from "axios";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userTypes.USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );
    dispatch({
      type: userTypes.USER_LOGIN_SUCCESS,
      payload: (await res).data,
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: userTypes.USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const userRegisterAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: userTypes.USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "/api/users/register",
        { name, email, password },
        config
      );

      dispatch({
        type: userTypes.USER_REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: userTypes.USER_LOGIN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (err) {
      dispatch({
        type: userTypes.USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

//

// pending ..  error message correction
export const getUserDetailsAction = (route) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userTypes.USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/users/${route}`, config);
    // it just hasd to  match the route that api/users/profile
    // profile has top be passed .. nothing wrong here
    dispatch({
      type: userTypes.USER_DETAILS_SUCCESS,
      payload: res.data,
    });
    // sends the user data to the reducer
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "unauthorized token") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: userTypes.USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
  // recieves froim profile screen js
  try {
    dispatch({ type: userTypes.USER_UPDATE_PROFILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: userTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: userTypes.USER_LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "unauthorized token") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: userTypes.USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const listAlluserAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userTypes.USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/users/allusers`, config);
    dispatch({
      type: userTypes.USER_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "unauthorized token") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: userTypes.USER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteUserAction = (id) => async (dispatch, getState) => {
  console.log(id);
  try {
    dispatch({
      type: userTypes.USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/delete/${id}`, config);
    dispatch({ type: userTypes.USER_DELETE_SUCCESS });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "unauthorized token") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: userTypes.USER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateUserAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userTypes.USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.put(`/api/users/user/${user._id}`, user, config);

    dispatch({ type: userTypes.USER_UPDATE_SUCCESS });

    dispatch({ type: userTypes.USER_DETAILS_SUCCESS, payload: res.data });

    dispatch({ type: userTypes.USER_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: userTypes.USER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const userLogoutAction = () => (dispatch) => {
  // localStorage.removeItem("userInfo");
  // localStorage.removeItem("cartItems");
  // localStorage.removeItem("shippingAddress");
  // localStorage.removeItem("paymentMethod");
  localStorage.clear();

  dispatch({ type: userTypes.USER_LOGOUT });
  dispatch({ type: userTypes.USER_DETAILS_RESET });
  dispatch({ type: userTypes.USER_LIST_RESET });
  dispatch({ type: orderTypes.ORDER_LIST_MY_RESET });
  document.location.href = "/login";
};
