import { userTypes } from "../ActionTypes";

const userInfofromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initstate = {
  userInfo: userInfofromStorage,
  loading: false,
  error: null,
  user: {},
  users: [],
  success: false,
};

export const userLoginReducer = (state = initstate, action) => {
  switch (action.type) {
    case userTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case userTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.USER_LOGOUT:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const userRegisterReducer = (state = initstate, action) => {
  switch (action.type) {
    case userTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case userTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.USER_LOGOUT:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const userDetailsReducer = (state = initstate, action) => {
  switch (action.type) {
    case userTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case userTypes.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.USER_DETAILS_RESET:
      return {
        ...state,
        user: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export const userProfileReducer = (state = initstate, action) => {
  switch (action.type) {
    case userTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        success: true,
      };
    case userTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const userListReducer = (state = initstate, action) => {
  switch (action.type) {
    case userTypes.USER_LIST_REQUEST:
      return { ...state, loading: true };
    case userTypes.USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case userTypes.USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userTypes.USER_LIST_RESET:
      return { ...state, users: [] };
    default:
      return { ...state };
  }
};

export const userDeleteReducer = (state = initstate, action) => {
  switch (action.type) {
    case userTypes.USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case userTypes.USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case userTypes.USER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

export const userUpdateReducer = (state = initstate, action) => {
  switch (action.type) {
    case userTypes.USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case userTypes.USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case userTypes.USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userTypes.USER_UPDATE_RESET:
      return { ...state, user: {} };
    default:
      return { ...state };
  }
};
