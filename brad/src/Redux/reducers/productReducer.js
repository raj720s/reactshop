import { productTypes } from "../ActionTypes";
const initState = {
  products: [],
  product: {
    reviews: [],
  },
  loading: false,
  pages: "",
  page: "",
  error: "",
  success: false,
};

export const productListReducer = (state = initState, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case productTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case productTypes.PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const productDetailsReducer = (state = initState, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case productTypes.PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case productTypes.PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
export const productDeleteReducer = (state = initState, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case productTypes.PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case productTypes.PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const productCreateReducer = (state = initState, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case productTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case productTypes.PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productTypes.PRODUCT_CREATE_RESET:
      return {};
    default:
      return { ...state };
  }
};
export const productUpdateReducer = (state = initState, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case productTypes.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case productTypes.PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productTypes.PRODUCT_UPDATE_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const productReviewReducer = (state = initState, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case productTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case productTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productTypes.PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const TopRatedproductReducer = (state = initState, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_TOP_REQUEST:
      return { ...state, loading: true };
    case productTypes.PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case productTypes.PRODUCT_TOP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
