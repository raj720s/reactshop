import { orderTypes } from "../ActionTypes";

const orderState = {
  loading: false,
  success: false,
  order: {},
  error: "",
  orderItems: [],
  shippingAddress: {},
  orders: [],
  isPaid: false,
  isDelivered: false,
};

export const orderCreateReducer = (state = orderState, action) => {
  switch (action.type) {
    case orderTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case orderTypes.ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case orderTypes.ORDER_CREATE_RESET:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const orderDetailsReducer = (
  state = { ...orderState, loading: true },
  action
) => {
  switch (action.type) {
    case orderTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderTypes.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,

        order: action.payload,
      };
    case orderTypes.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const orderPayReducer = (state = orderState, action) => {
  switch (action.type) {
    case orderTypes.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderTypes.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isPaid: true,
      };
    case orderTypes.ORDER_PAY_ADMIN:
      return {
        ...state,
        loading: false,
        success: true,
        isPaid: true,
        order: action.payload,
      };
    case orderTypes.ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case orderTypes.ORDER_PAY_RESET:
      return {};
    default:
      return {
        ...state,
      };
  }
};
export const orderDeliverReducer = (state = orderState, action) => {
  switch (action.type) {
    case orderTypes.ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderTypes.ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isDelivered: true,
      };
    case orderTypes.ORDER_DELIVER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case orderTypes.ORDER_DELIVER_RESET:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const orderListReducer = (state = orderState, action) => {
  switch (action.type) {
    case orderTypes.ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderTypes.ORDER_LIST_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case orderTypes.ORDER_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export const myOrderListReducer = (state = orderState, action) => {
  switch (action.type) {
    case orderTypes.ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderTypes.ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case orderTypes.ORDER_LIST_MY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case orderTypes.ORDER_LIST_MY_RESET:
      return {};
    default:
      return {
        ...state,
      };
  }
};
