import {combineReducers} from "redux";
import authReducer from "./authReducer";
import autosuggestReducer from "./autosuggestReducer";
import packageReducer from "./packageReducer";
import H2LReducer from "./H2LReducer";
import commonReducer from "./commonReducer";
export default combineReducers({
  auth: authReducer,
  autodata: autosuggestReducer,
  pkgdata: packageReducer,
  h2ldata: H2LReducer,
  commondata: commonReducer
});
