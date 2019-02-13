/* eslint-disable */
import axios from "axios";
import * as CONSTANTS from "../config/keys";
import {
  FETCH_USER,
  OPEN_ALERT_BOX,
  CLOSE_ALERT_BOX,
  SET_LOADER_FLAG,
  MAYBE_UPDATE_SUGGESTIONS,
  UPDATE_INPUT_VALUE,
  CLEAR_SUGGESTIONS,
  LOAD_SUGGESTIONS_BEGIN,
  GET_PACAKAGE_DATA,
  UPLOAD_DATA,
  CATPIN_TIER_WISE_DATA,
  CATEGORY_PINCODE_BUDGET,
  REGISTER_INFO,
  GET_ERRORS,
  CITY_DATA,
  TOGGLE_CITY_DATA,
  RESET_CITY_DATA,
  TOGGLE_ERROR,
  SET_PACKAGE_PRICE,
  TOGGLE_PKG_PRICING_TAB,
  SET_PACKAGE_OPTIONS,
  UPDATE_PACKAGE_BUDGET,
  FETCH_PACKAGE_BUDGET,
  SET_TAB,
  TOGGLE_TAB
} from "./types";
import {capitalize} from "../utils/helper";
/*const fetchUser = () => {
  const request = axios.get("/api/current_user");
  return {
    type: FETCH_USER,
    payload: request
  };
};*/
/*export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};*/
/*export const fetchUser = () =>
  function(dispatch) {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };*/
//export const fetchUser = () => async dispatch => {
//const res = await axios.get('/api/current_user');
//dispatch({ type: FETCH_USER, payload: 1 });
//};

export const openAlertBox = () => {
  return function(dispatch) {
    dispatch({type: OPEN_ALERT_BOX, payload: "true"});
  };
};
export const closeAlertBox = () => {
  return function(dispatch) {
    dispatch({type: CLOSE_ALERT_BOX, payload: "false"});
  };
};
export function updateInputValue(value) {
  return function(dispatch) {
    dispatch({type: UPDATE_INPUT_VALUE, payload: value});
  };
}
//
// export function clearSuggestions() {
//   return function(dispatch) {
//     dispatch({ type: 'CLEAR_SUGGESTIONS', payload: '' });
//   };
// }
//
/*
export function maybeUpdateSuggestions(id, value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return function(dispatch, getState) {
    if (inputLength > 1) {
      if (id === "h2lctgrid" || id === "h2lctcatpin" || id === "pkgempauto") {
        axios
          .post(CONSTANTS.node_api + "addInfo/cityauto/", {
            srchcity: inputValue
          })
          .then(response => {
            let suggestions = response.data;

            if (suggestions.errorcode === 0) {
              dispatch({
                type: MAYBE_UPDATE_SUGGESTIONS,
                payload: suggestions.data
              });
            }
          })
          .catch(err => {
            dispatch({type: MAYBE_UPDATE_SUGGESTIONS, suggestions: err});
          });
      } else if (id === "h2lcatauto" || id === "h2lpinauto") {
        let funcname;

        if (id === "h2lcatauto") {
          funcname = "getCatAutoSuggest";
        } else {
          funcname = "getPinAutoSuggest";
        }

        let data_city = getState().autodata.catpinbdgt_cityauto;
        axios
          .post(CONSTANTS.services_url + "addInfo/" + funcname + "/", {
            search: inputValue,
            data_city: data_city
          })
          .then(response => {
            //console.log("response i got" + JSON.stringify(response));
            let suggestions = response.data;

            if (suggestions.errorcode === 0) {
              dispatch({
                type: MAYBE_UPDATE_SUGGESTIONS,
                payload: suggestions.data
              });
            }
          })
          .catch(err => {
            dispatch({type: MAYBE_UPDATE_SUGGESTIONS, suggestions: err});
          });
      }
    }
  };
}*/

export function maybeUpdateSuggestions(id, value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  return function(dispatch, getState) {
    if (inputLength > 1) {
      if (id === "pkgempauto2") {
        axios
          .post(
            CONSTANTS.node_api + "addInfo/cityauto/",
            {
              srchcity: inputValue
            },
            {
              cancelToken: source.token
            }
          )
          .then(response => {
            let suggestions = response.data;

            if (suggestions.errorcode === 0) {
              dispatch({
                type: MAYBE_UPDATE_SUGGESTIONS,
                payload: suggestions.data
              });
            } else if (suggestions.errorcode === 1) {
              dispatch({
                type: MAYBE_UPDATE_SUGGESTIONS,
                payload: []
              });
            }
          })
          .catch(err => {
            dispatch({type: MAYBE_UPDATE_SUGGESTIONS, suggestions: err});
          });
      } else if (id === "pkgempauto") {
        axios
          .get(
            CONSTANTS.sso_api + "employee/employee_xhr/10/1?term=" + inputValue,
            {
              cancelToken: source.token
            }
          )
          .then(response => {
            let suggestions = response.data;

            if (Object.keys(suggestions).length > 0) {
              let empdata = [];
              for (let i = 0; i < suggestions.length; i++) {
                let empname = capitalize(suggestions[i].empname);
                let empcode = suggestions[i].empcode;

                let empdetails = empname + " (" + empcode + ")";

                empdata.push(empdetails);
              }

              dispatch({
                type: MAYBE_UPDATE_SUGGESTIONS,
                payload: empdata
              });
            } else {
              dispatch({
                type: MAYBE_UPDATE_SUGGESTIONS,
                payload: []
              });
            }
          })
          .catch(err => {
            dispatch({type: MAYBE_UPDATE_SUGGESTIONS, suggestions: err});
          });
      }
    }
  };
}

// export function updateInputValue(value) {
//   return {
//     type: UPDATE_INPUT_VALUE,
//     value
//   };
// }

export function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS
  };
}

export function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN
  };
}

export function getPackageData() {
  return function(dispatch) {
    axios
      .post(CONSTANTS.services_url + "package/getPackageData/", {
        data_city: "Mumbai"
      })
      .then(function(response) {
        let suggestions = response;

        dispatch({
          type: GET_PACAKAGE_DATA,
          payload: suggestions
        });
      })
      .catch(err => {
        console.log("error" + err);
        dispatch({type: GET_PACAKAGE_DATA, suggestions: err});
      });
  };
}

export function fetchH2LBudgetData(data_city, id, pgno) {
  let funcname;
  let type;
  if (id === "h2lctgrid") {
    funcname = "catPinTierWiseBudget";
    type = CATPIN_TIER_WISE_DATA;
  } else if (id === "h2lctcatpin") {
    funcname = "categoryPincodeBudget";
    type = CATEGORY_PINCODE_BUDGET;
  }
  return function(dispatch) {
    axios
      .post(CONSTANTS.services_url + "h2l/" + funcname + "/", {
        data_city: data_city,
        pgno: pgno
      })
      .then(function(response) {
        dispatch({
          type: type,
          pgno: pgno,
          payload: response
        });
      })
      .catch(err => {
        dispatch({type: type, payload: err});
      });
  };
}

export function uploadData(formData) {
  // const config = {
  //   headers: {"content-type": "multipart/form-data"}
  // };

  formData.set("data_city", "Mumbai");

  return function(dispatch) {
    // axios
    //   .post(
    //     CONSTANTS.services_url + "addInfo/uploadData/",
    //     formData,
    //     config
    //   )
    axios({
      method: "post",
      url: CONSTANTS.services_url + "addInfo/uploadData/",
      data: formData,
      config: {headers: {"Content-Type": "multipart/form-data"}}
    })
      .then(function(response) {
        let suggestions = response;

        dispatch({
          type: UPLOAD_DATA,
          payload: suggestions
        });
      })
      .catch(err => {
        console.log("error" + err);
        dispatch({type: UPLOAD_DATA, payload: err});
      });
  };
}

export function setLoaderFlag(requestFrom) {
  return {
    type: SET_LOADER_FLAG,
    payload: requestFrom
  };
}

{
  /* Authentication Related */
}
// Register User
export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(function(response) {
      dispatch({
        type: REGISTER_INFO,
        payload: response
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const fetchUser = ucode => dispatch => {
  axios
    .post(CONSTANTS.node_api + "user/fetchUser", {
      ucode: ucode
    })
    .then(function(response) {
      let result = response.data;
      let auth_flag = false;
      if (typeof result.error !== "undefined" && result.error === 0) {
        auth_flag = true;
      }

      dispatch({
        type: FETCH_USER,
        payload: auth_flag
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export function cityData(source, type) {
  return function(dispatch) {
    axios
      .post(CONSTANTS.node_api + "addInfo/citydata", {
        source,
        type
      })
      .then(function(response) {
        let result = response.data;

        if (typeof result.error !== "undefined" && result.error === 0) {
          let newres = {};
          let resdata = result.data;
          for (let prop in resdata) {
            if (resdata.hasOwnProperty(prop)) {
              newres[resdata[prop]] = true;
            }
          }
          dispatch({
            type: CITY_DATA,
            payload: newres,
            request: type
          });
        } else {
          let err_obj = {};
          err_obj["camp"] = "package";
          err_obj["show"] = 1;
          err_obj["message"] =
            "Error found while fetching cities : " + result.msg;
          err_obj["header"] = "ERROR !!!";

          dispatch({type: TOGGLE_ERROR, payload: err_obj});
        }
      })
      .catch(err => {
        console.log("error" + err);

        let err_obj = {};
        err_obj["camp"] = "package";
        err_obj["show"] = 1;

        err_obj["header"] = "ERROR !!!";
        if (typeof err.response !== "undefined") {
          err_obj["message"] = err.response.data.msg;
        } else {
          err_obj["message"] =
            "Error found while fetching cities : " + err.stack;
        }

        dispatch({type: TOGGLE_ERROR, payload: err_obj});
      });
  };
}

export function toggleCityData(request, selcity) {
  return {
    type: TOGGLE_CITY_DATA,
    payload: selcity,
    request
  };
}

export function resetCityData(request) {
  return {
    type: RESET_CITY_DATA,
    request
  };
}

export function toggleError(payload) {
  return {
    type: TOGGLE_ERROR,
    payload
  };
}
export function setPackagePrice(tab, field, value) {
  return {
    type: SET_PACKAGE_PRICE,
    tab,
    field,
    value
  };
}

export function togglePkgPricingTab(payload) {
  return {
    type: TOGGLE_PKG_PRICING_TAB,
    payload
  };
}

export function setPackageOptions(option, reqtype, reset_flag) {
  return {
    type: SET_PACKAGE_OPTIONS,
    option,
    reqtype,
    reset_flag
  };
}

export function updatePackageBudget(type, data) {
  let api_url = "";
  switch (type) {
    case "city":
      api_url = CONSTANTS.node_api + "budget/bulkinsertctbudget";
      break;
    case "group":
      api_url = CONSTANTS.node_api + "budget/setgroupbudget";
      break;
    case "team":
      api_url = CONSTANTS.node_api + "budget/setteambudget";
      break;
    case "user":
      api_url = CONSTANTS.node_api + "budget/setempbudget";
      break;
    case "contractid":
      api_url = CONSTANTS.node_api + "budget/setconbudget";
      break;
    default:
      api_url = "";
  }
  return function(dispatch) {
    axios
      .post(api_url, data)
      .then(function(response) {
        let result = response.data;

        if (typeof result.error !== "undefined" && result.error === 0) {
          let updt_resp = {};
          updt_resp["error"] = 0;
          updt_resp["message"] = "Package Budget updated successfully.";
          updt_resp["header"] = ":: Budget Update ::";
          updt_resp["reset"] = 1;
          updt_resp["show"] = 1;
          dispatch({
            type: UPDATE_PACKAGE_BUDGET,
            payload: updt_resp
          });
        } else {
          console.log(result);
          let updt_resp = {};
          updt_resp["error"] = 1;
          updt_resp["message"] =
            "Error in submitting Package Budget. " + result.msg;
          updt_resp["header"] = ":: Budget Update ::";
          updt_resp["reset"] = 0;
          updt_resp["show"] = 1;
          dispatch({
            type: UPDATE_PACKAGE_BUDGET,
            payload: updt_resp
          });
        }
      })
      .catch(err => {
        let updt_resp = {};
        updt_resp["error"] = 1;
        if (typeof err.response !== "undefined") {
          updt_resp["message"] = err.response.data.msg;
        } else {
          updt_resp["message"] =
            "Error found while updating package budget. " + err.stack;
        }
        updt_resp["header"] = ":: Budget Update ::";
        updt_resp["reset"] = 0;
        updt_resp["show"] = 1;
        dispatch({
          type: UPDATE_PACKAGE_BUDGET,
          payload: updt_resp
        });
      });
  };
}
export function setTab(tab) {
  return {
    type: SET_TAB,
    tab
  };
}
export function toggleTab(tab) {
  return {
    type: TOGGLE_TAB,
    tab
  };
}

export function fetchPackageBudget(data) {
  let api_url = "";
  let param_obj = {};
  switch (data.type) {
    case "group":
      api_url = CONSTANTS.node_api + "budget/getgroupbudget";
      param_obj["city"] = data.city;
      param_obj["group_type"] = data.group_type;
      break;
    case "team":
      api_url = CONSTANTS.node_api + "budget/getteambudget";
      param_obj["city"] = data.city;
      param_obj["team_type"] = data.team_type;
      break;
    case "user":
      api_url = CONSTANTS.node_api + "budget/getempbudget";
      break;
    case "contractid":
      api_url = CONSTANTS.node_api + "budget/getconbudget";
      param_obj["city"] = data.city;
      param_obj["parentid"] = data.parentid;
      break;
    default:
      api_url = "";
  }
  return function(dispatch) {
    axios
      .post(api_url, param_obj)
      .then(function(response) {
        let result = response.data;
        console.log(result);
        if (typeof result.error !== "undefined" && result.error === 0) {
          let final_res = result.data;
          let payload = {};
          switch (data.type) {
            case "group":
              let group_type = data.group_type;
              if (typeof final_res[group_type].package !== "undefined") {
                let pkg_data = final_res[group_type].package;
                let prempkg = {};
                let pkgvfl = {};
                let pkgexp = {};
                let flxcat = {};
                let premium_package = false;
                let package_vfl = false;
                let package_expiry = false;
                let flexi_category = false;
                for (let prop in pkg_data) {
                  if (pkg_data.hasOwnProperty(prop)) {
                    if (prop.indexOf("prempkg") !== -1) {
                      prempkg[prop] = pkg_data[prop];
                      premium_package = true;
                    }
                    if (prop.indexOf("pkgvfl") !== -1) {
                      pkgvfl[prop] = pkg_data[prop];
                      package_vfl = true;
                    }
                    if (prop.indexOf("pkgexp") !== -1) {
                      pkgexp[prop] = pkg_data[prop];
                      package_expiry = true;
                    }
                    if (prop.indexOf("flxcat") !== -1) {
                      flxcat[prop] = pkg_data[prop];
                      flexi_category = true;
                    }
                  }
                }
                dispatch({
                  type: FETCH_PACKAGE_BUDGET,
                  prempkg: prempkg,
                  pkgvfl: pkgvfl,
                  pkgexp: pkgexp,
                  flxcat: flxcat,
                  premium_package: premium_package,
                  package_vfl: package_vfl,
                  package_expiry: package_expiry,
                  flexi_category: flexi_category
                });
              }
              break;
            case "team":
              let team_type = data.team_type.toLowerCase();
              if (typeof final_res[team_type].package !== "undefined") {
                let pkg_data = final_res[team_type].package;
                let prempkg = {};
                let pkgvfl = {};
                let pkgexp = {};
                let flxcat = {};
                let premium_package = false;
                let package_vfl = false;
                let package_expiry = false;
                let flexi_category = false;
                for (let prop in pkg_data) {
                  if (pkg_data.hasOwnProperty(prop)) {
                    if (prop.indexOf("prempkg") !== -1) {
                      prempkg[prop] = pkg_data[prop];
                      premium_package = true;
                    }
                    if (prop.indexOf("pkgvfl") !== -1) {
                      pkgvfl[prop] = pkg_data[prop];
                      package_vfl = true;
                    }
                    if (prop.indexOf("pkgexp") !== -1) {
                      pkgexp[prop] = pkg_data[prop];
                      package_expiry = true;
                    }
                    if (prop.indexOf("flxcat") !== -1) {
                      flxcat[prop] = pkg_data[prop];
                      flexi_category = true;
                    }
                  }
                }
                dispatch({
                  type: FETCH_PACKAGE_BUDGET,
                  prempkg: prempkg,
                  pkgvfl: pkgvfl,
                  pkgexp: pkgexp,
                  flxcat: flxcat,
                  premium_package: premium_package,
                  package_vfl: package_vfl,
                  package_expiry: package_expiry,
                  flexi_category: flexi_category
                });
              }
              break;

            case "contractid":
              if (typeof final_res.package !== "undefined") {
                let pkg_data = final_res.package;
                let prempkg = {};
                let pkgvfl = {};
                let pkgexp = {};
                let flxcat = {};
                let premium_package = false;
                let package_vfl = false;
                let package_expiry = false;
                let flexi_category = false;
                for (let prop in pkg_data) {
                  if (pkg_data.hasOwnProperty(prop)) {
                    if (prop.indexOf("prempkg") !== -1) {
                      prempkg[prop] = pkg_data[prop];
                      premium_package = true;
                    }
                    if (prop.indexOf("pkgvfl") !== -1) {
                      pkgvfl[prop] = pkg_data[prop];
                      package_vfl = true;
                    }
                    if (prop.indexOf("pkgexp") !== -1) {
                      pkgexp[prop] = pkg_data[prop];
                      package_expiry = true;
                    }
                    if (prop.indexOf("flxcat") !== -1) {
                      flxcat[prop] = pkg_data[prop];
                      flexi_category = true;
                    }
                  }
                }
                dispatch({
                  type: FETCH_PACKAGE_BUDGET,
                  prempkg: prempkg,
                  pkgvfl: pkgvfl,
                  pkgexp: pkgexp,
                  flxcat: flxcat,
                  premium_package: premium_package,
                  package_vfl: package_vfl,
                  package_expiry: package_expiry,
                  flexi_category: flexi_category
                });
              }
              break;

            default:
              payload = {};
          }
        } else {
          dispatch({
            type: SET_PACKAGE_OPTIONS,
            option: data.type,
            reqtype: "tabclick",
            reset_flag: null
          });
        }
      })
      .catch(err => {
        let err_obj = {};
        err_obj["camp"] = "package";
        err_obj["show"] = 1;

        err_obj["header"] = "ERROR !!!";
        if (typeof err.response !== "undefined") {
          err_obj["message"] = err.response.data.msg;
        } else {
          err_obj["message"] =
            "Error found while fetching budget : " + err.stack;
        }

        dispatch({type: TOGGLE_ERROR, payload: err_obj});
      });
  };
}

export function resetPackageBudget(data) {
  let api_url = CONSTANTS.node_api + "budget/resetpkgbudget";

  return function(dispatch) {
    axios
      .post(api_url, data)
      .then(function(response) {
        let result = response.data;

        if (typeof result.error !== "undefined" && result.error === 0) {
          let reset_resp = {};
          reset_resp["error"] = 0;
          reset_resp["message"] = result.msg;
          reset_resp["header"] = ":: Budget Reset ::";
          reset_resp["reset"] = 1;
          reset_resp["show"] = 1;
          dispatch({
            type: UPDATE_PACKAGE_BUDGET,
            payload: reset_resp
          });
        } else {
          let reset_resp = {};
          reset_resp["error"] = 1;
          reset_resp["message"] = result.msg;
          reset_resp["header"] = ":: Budget Reset ::";
          reset_resp["reset"] = 1;
          reset_resp["show"] = 1;
          dispatch({
            type: UPDATE_PACKAGE_BUDGET,
            payload: reset_resp
          });
        }
      })
      .catch(err => {
        let reset_resp = {};
        reset_resp["error"] = 1;
        if (typeof err.response !== "undefined") {
          reset_resp["message"] = err.response.data.msg;
        } else {
          reset_resp["message"] =
            "Error found while removing package budget. " + err.stack;
        }
        reset_resp["header"] = ":: Budget Reset ::";
        reset_resp["reset"] = 0;
        reset_resp["show"] = 1;
        dispatch({
          type: UPDATE_PACKAGE_BUDGET,
          payload: reset_resp
        });
      });
  };
}
