import {MAYBE_UPDATE_SUGGESTIONS} from "../actions/types";
import {UPDATE_INPUT_VALUE} from "../actions/types";
import {CLEAR_SUGGESTIONS} from "../actions/types";
import {LOAD_SUGGESTIONS_BEGIN} from "../actions/types";

const initialAutoState = {
  suggestions: [],
  isLoading: false,
  catpintier_cityauto: "",
  catpinbdgt_cityauto: "",
  catpinbdgt_catauto: "",
  catpinbdgt_pinauto: "",
  pkg_empauto: "",
  pkg_empcode: ""
};
export default function(state = initialAutoState, action) {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      switch (action.payload.id) {
        case "h2lctgrid":
          return {
            ...state,
            catpintier_cityauto: action.payload.val.newValue
          };
        case "h2lctcatpin":
          return {
            ...state,
            catpinbdgt_cityauto: action.payload.val.newValue
          };
        case "h2lcatauto":
          return {
            ...state,
            catpinbdgt_catauto: action.payload.val.newValue
          };
        case "h2lpinauto":
          return {
            ...state,
            catpinbdgt_pinauto: action.payload.val.newValue
          };
        case "pkgempauto":
          return {
            ...state,
            pkg_empauto: action.payload.val.newValue,
            pkg_empcode: action.payload.val.empcode
          };
        default:
          return {
            ...state
          };
      }

    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      return {
        ...state,
        suggestions: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
}
