import {UPLOAD_DATA, GET_ERRORS} from "../actions/types";

const initialCommonState = {
  uploadinfo: [],
  loader_flag: false
};

export default function(state = initialCommonState, action) {
  //console.log(action);
  switch (action.type) {
    case UPLOAD_DATA:
      return {
        ...state,
        uploadinfo: action.payload,
        loader_flag: false
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload.data,
        loader_flag: false
      };
    default:
      return state;
  }
}
