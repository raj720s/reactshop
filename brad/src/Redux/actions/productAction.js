import axios from "axios";
import { productTypes } from "../ActionTypes";
import { userLogoutAction } from "./userAction";

export const listProductsAction =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: productTypes.PRODUCT_LIST_REQUEST });
      const res = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      // const res = await axios.get(`/api/products`);
      const data = await res.data;
      // console.log(res);
      await dispatch({
        type: productTypes.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
      // console.log(data);
    } catch (err) {
      dispatch({
        type: productTypes.PRODUCT_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listProductDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: productTypes.PRODUCT_DETAILS_REQUEST });
    const res = await axios.get(`/api/products/${id}`);
    const data = await res.data;
    // console.log(data.data);
    await dispatch({
      type: productTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: productTypes.PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: productTypes.PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: productTypes.PRODUCT_DELETE_SUCCESS,
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
      type: productTypes.PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProductAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: productTypes.PRODUCT_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.post(`/api/products/`, {}, config);
    dispatch({
      type: productTypes.PRODUCT_CREATE_SUCCESS,
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
      type: productTypes.PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: productTypes.PRODUCT_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    dispatch({
      type: productTypes.PRODUCT_UPDATE_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: productTypes.PRODUCT_DETAILS_SUCCESS,
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
      type: productTypes.PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const createProductReviewAction =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: productTypes.PRODUCT_CREATE_REVIEW_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.post(
        `/api/products/${productId}/review`,
        review,
        config
      );
      dispatch({
        type: productTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const message =
        err.response && err.response.data.msg ? err.response.data.msg : err.msg;

      if (message === "unauthorized token") {
        dispatch(userLogoutAction());
      }

      dispatch({
        type: productTypes.PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
//
export const listTopProductAction = () => async (dispatch) => {
  try {
    dispatch({ type: productTypes.PRODUCT_TOP_REQUEST });

    const res = await axios.get(`/api/products/top`);
    dispatch({
      type: productTypes.PRODUCT_TOP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({
      type: productTypes.PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};
