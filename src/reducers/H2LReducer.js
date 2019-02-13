import {
  SET_LOADER_FLAG,
  CATPIN_TIER_WISE_DATA,
  CATEGORY_PINCODE_BUDGET,
  UPDATE_INPUT_VALUE
} from "../actions/types";
import helper from "../utils/helper";
const initialH2LState = {
  catpintier_data: [],
  catpinbdgt_data: [],
  catpinpgno: 1,
  loader_flag: false
};
export default function(state = initialH2LState, action) {
  switch (action.type) {
    case SET_LOADER_FLAG:
      if (action.payload === "h2l") {
        return {
          ...state,
          loader_flag: true
        };
      } else {
        return {
          ...state
        };
      }
    case CATPIN_TIER_WISE_DATA:
      return {
        ...state,
        catpintier_data: action.payload.data,
        loader_flag: false
      };
    case CATEGORY_PINCODE_BUDGET:
      if (!helper.isEmpty(state.catpinbdgt_data) && action.pgno !== 1) {
        var jsonArray1 = state.catpinbdgt_data.data;
        var jsonArray2 = action.payload.data.data;
        jsonArray1 = jsonArray1.concat(jsonArray2);
        var temp_obj = {};
        temp_obj["data"] = jsonArray1;
        temp_obj["errorcode"] = action.payload.data.errorcode;
        temp_obj["hasmore"] = action.payload.data.hasmore;
        return {
          ...state,
          catpinbdgt_data: temp_obj,
          catpinpgno: action.pgno,
          loader_flag: false
        };
      } else {
        return {
          ...state,
          catpinbdgt_data: action.payload.data,
          catpinpgno: action.pgno,
          loader_flag: false
        };
      }

    case UPDATE_INPUT_VALUE:
      //h2lctgrid
      // h2lctcatpin
      switch (action.payload.id) {
        case "h2lctgrid":
          return {
            ...state,
            catpintier_data: [],
            catpinbdgt_data: []
          };
        case "h2lctcatpin":
          return {
            ...state,
            catpintier_data: [],
            catpinbdgt_data: []
          };

        default:
          return {
            ...state
          };
      }

    default:
      return state;
  }
}
