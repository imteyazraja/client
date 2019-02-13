import {REGISTER_INFO, FETCH_USER, SET_LOADER_FLAG} from "../actions/types";

const initialAuthState = {
  register_data: [],
  loader_flag: false,
  auth_flag: null
};

export default function(state = initialAuthState, action) {
  //console.log(action);
  switch (action.type) {
    case REGISTER_INFO:
      return {
        ...state,
        register_data: action.payload.data,
        loader_flag: false
      };
    case FETCH_USER:
      return {
        ...state,
        auth_flag: action.payload,
        loader_flag: false
      };
    case SET_LOADER_FLAG:
      if (action.payload === "auth") {
        return {
          ...state,
          loader_flag: true
        };
      } else {
        return {
          ...state
        };
      }
    default:
      return state;
  }
}
