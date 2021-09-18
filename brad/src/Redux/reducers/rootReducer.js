import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import {
  myOrderListReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "./orderReducer";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewReducer,
  productUpdateReducer,
  TopRatedproductReducer,
} from "./productReducer";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducer";

const rootReducer = combineReducers({
  productLists: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewReducer,
  productTopRated: TopRatedproductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderDetails: orderDetailsReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
});

export default rootReducer;
