import Axios from "axios";
import { cartTypes, userTypes } from "../ActionTypes";

export const addtoCartAction = (id, qty) => async (dispatch, getState) => {
  // getState allows too get the entire state tree fromthe store
  const { data } = await Axios.get(`/api/products/${id}`);
  // console.log(data);
  dispatch({
    type: cartTypes.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removefromCartAction = (id) => (dispatch, getState) => {
  // this is a thunked action which can be async function as well
  dispatch({
    type: cartTypes.CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddressAction = (data) => async (dispatch) => {
  dispatch({
    type: cartTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  console.log(data);
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethodAction = (data) => async (dispatch) => {
  dispatch({
    type: cartTypes.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
