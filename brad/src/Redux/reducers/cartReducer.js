import { cartTypes } from "../ActionTypes";
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: "",
};

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case cartTypes.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
          // this maps through the cartItems to find x product . which equals the existitem product if this exists .. we return the  item  which is action.payload .. else  it returns the x .. which simply .. already existys ..
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case cartTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case cartTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case cartTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
