import axios from "axios";

import { cartTypes, orderTypes, userTypes } from "../ActionTypes";
import { userLogoutAction } from "./userAction";

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderTypes.ORDER_CREATE_REQUEST,
    });
    console.log(order);
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/orders`, order, config);
    // config makes sure that the token is avaliable in  a manual way ..
    dispatch({
      type: orderTypes.ORDER_CREATE_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
    dispatch({
      type: cartTypes.CART_CLEAR_ITEMS,
      payload: res.data,
    });
    localStorage.removeItem("cartItems");
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    if (message === "unauthorized token") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: orderTypes.ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetailsAction =
  (orderId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: orderTypes.ORDER_DETAILS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const res = await axios.get(`/api/orders/${orderId}`, config);
      // console.log("order details", res.data);
      dispatch({
        type: orderTypes.ORDER_DETAILS_SUCCESS,
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
        type: orderTypes.ORDER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
//

export const payOrderAction =
  (orderId, paymentResult) => async (dispatch, getState) => {
    // payment result we will  get  from paypal
    try {
      dispatch({
        type: orderTypes.ORDER_PAY_REQUEST,
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

      const res = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: orderTypes.ORDER_PAY_SUCCESS,
        payload: res.data,
        loading: false,
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
        type: orderTypes.ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };
//
export const paybyAdminOrderAction =
  (orderId) => async (dispatch, getState) => {
    // payment result we will  get  from paypal
    try {
      dispatch({
        type: orderTypes.ORDER_PAY_REQUEST,
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

      const res = await axios.put(
        `/api/orders/${orderId}/pay/admin`,
        {},
        config
      );

      dispatch({
        type: orderTypes.ORDER_PAY_ADMIN,
        payload: res.data,
        loading: false,
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
        type: orderTypes.ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };
//

export const deliverOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderTypes.ORDER_DELIVER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);
    dispatch({
      type: orderTypes.ORDER_DELIVER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: orderTypes.ORDER_DELIVER_FAIL,
      payload: message,
    });
  }
};

export const listMyOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderTypes.ORDER_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/orders/myorders`, config);
    dispatch({
      type: orderTypes.ORDER_LIST_MY_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    const msg =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (msg === "unauthorized token") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: orderTypes.ORDER_LIST_MY_FAIL,
      payload: msg,
    });
  }
};

export const listOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderTypes.ORDER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/orders`, config);
    dispatch({
      type: orderTypes.ORDER_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const msg =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (msg === "unauthorized token") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: orderTypes.ORDER_LIST_FAIL,
    });
  }
};
