import {
  GET_PACAKAGE_DATA,
  SET_LOADER_FLAG,
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
} from "../actions/types";
import {CITY_TYPE_OBJ} from "../common/constants";

const initialPackageState = {
  tabName: "pkg",
  pkg_option: "city",
  package_data: [],
  tier2_cities: {},
  tier3_cities: {},
  mumrmt_cities: {},
  delrmt_cities: {},
  kolrmt_cities: {},
  blrrmt_cities: {},
  chnrmt_cities: {},
  punrmt_cities: {},
  hydrmt_cities: {},
  ahmrmt_cities: {},
  cbermt_cities: {},
  jprrmt_cities: {},
  chgrmt_cities: {},
  error_data: [],
  pkg_updt_resp: {},
  loader_flag: false,
  error_flag: false,
  premium_package: false,
  package_vfl: false,
  package_expiry: false,
  flexi_category: false,
  tabobj: {
    tier2: "",
    tier3: "",
    zone_mum: "",
    zone_del: "",
    zone_kol: "",
    zone_blr: "",
    zone_chn: "",
    zone_pun: "",
    zone_hyd: "",
    zone_ahm: "",
    zone_cbe: "",
    zone_jpr: "",
    zone_chg: "",
    Mumbaimain: "",
    Delhimain: "",
    Kolkatamain: "",
    Bangaloremain: "",
    Chennaimain: "",
    Punemain: "",
    Hyderabadmain: "",
    Ahmedabadmain: "",
    Jaipurmain: "",
    Chandigarhmain: "",
    Coimbatoremain: ""
  },
  prempkg: {
    prempkg_ecs: "",
    prempkg_nonecs: "",
    prempkg_twoyr_per: "",
    prempkg_disc_per: "",
    prempkg_disc_eligib: "",
    prempkg_threemon_nonecs: "",
    prempkg_citymin_bdgt: ""
  },
  pkgvfl: {
    pkgvfl_ecs: "",
    pkgvfl_nonecs: "",
    pkgvfl_ecs_custom: "",
    pkgvfl_nonecs_custom: "",
    pkgvfl_existing_ecs_per: "",
    pkgvfl_existing_nonecs_per: "",
    pkgvfl_expiry_ecs: "",
    pkgvfl_expiry_nonecs: ""
  },
  pkgexp: {
    pkgexp_ecs: "",
    pkgexp_nonecs: "",
    pkgexp_twoyr_nonecs: ""
  },
  flxcat: {
    flxcat_ecs: "",
    flxcat_nonecs: "",
    flxcat_twoyr_per: ""
  },
  grouptab: {
    city: "",
    group: ""
  },
  teamtab: {
    city: "",
    team: ""
  },
  contab: {
    city: "",
    pid: ""
  }
};
export default function(state = initialPackageState, action) {
  switch (action.type) {
    case GET_PACAKAGE_DATA:
      // Ignore suggestions if input value changed
      return {
        ...state,
        package_data: action.payload.data,
        loader_flag: false
      };
    case SET_LOADER_FLAG:
      if (action.payload === "package") {
        return {
          ...state,
          loader_flag: true
        };
      } else {
        return {
          ...state
        };
      }
    case TOGGLE_ERROR:
      if (action.payload.show === 1) {
        return {
          ...state,
          error_flag: true,
          error_data: action.payload,
          loader_flag: false
        };
      } else {
        return {
          ...state,
          error_flag: false,
          error_data: []
        };
      }

    case CITY_DATA:
      if (CITY_TYPE_OBJ.hasOwnProperty(action.request)) {
        return {
          ...state,
          [CITY_TYPE_OBJ[action.request]]: action.payload,
          loader_flag: false
        };
      } else {
        return {
          ...state
        };
      }
    /*
    if (action.request === "tier2") {
        return {
          ...state,
          tier2_cities: action.payload,
          loader_flag: false
        };
      }*/

    case TOGGLE_CITY_DATA:
      if (CITY_TYPE_OBJ.hasOwnProperty(action.request)) {
        let toggle_city = CITY_TYPE_OBJ[action.request];

        return {
          ...state,
          [CITY_TYPE_OBJ[action.request]]: {
            ...state[toggle_city],
            [action.payload]: !state[toggle_city][action.payload]
          }
        };
      } else {
        return {
          ...state
        };
      }
    /*
      if (action.request === "tier2") {
        return {
          ...state,
          tier2_cities: {
            ...state.tier2_cities,
            [action.payload]: !state.tier2_cities[action.payload]
          }
        };
      }*/

    case RESET_CITY_DATA:
      if (CITY_TYPE_OBJ.hasOwnProperty(action.request)) {
        let sel_type = CITY_TYPE_OBJ[action.request];

        let old_obj = Object.assign({}, state[sel_type]);
        let newobj = {};
        for (let prop in old_obj) {
          if (old_obj.hasOwnProperty(prop)) {
            newobj[prop] = true;
          }
        }
        return {
          ...state,
          [sel_type]: newobj
        };
      } else {
        return {
          ...state
        };
      }
    /*
      if (action.request === "tier2") {
        let old_obj = Object.assign({}, state.tier2_cities);

        let newobj = {};
        for (let prop in old_obj) {
          if (old_obj.hasOwnProperty(prop)) {
            newobj[prop] = true;
          }
        }
        return {
          ...state,
          tier2_cities: newobj
        };
      }*/
    case SET_PACKAGE_PRICE:
      return {
        ...state,
        [action.tab]: {
          ...state[action.tab],
          [action.field]: action.value
        }
      };
    case TOGGLE_PKG_PRICING_TAB:
      return {
        ...state,
        [action.payload]: !state[action.payload]
      };
    case SET_PACKAGE_OPTIONS:
      let prempkg_old = Object.assign({}, state.prempkg);
      let prempkg_new = {};
      for (let prempkg_prop in prempkg_old) {
        if (prempkg_old.hasOwnProperty(prempkg_prop)) {
          prempkg_new[prempkg_prop] = "";
        }
      }

      let pkgvfl_old = Object.assign({}, state.pkgvfl);
      let pkgvfl_new = {};
      for (let pkgvfl_prop in pkgvfl_old) {
        if (pkgvfl_old.hasOwnProperty(pkgvfl_prop)) {
          pkgvfl_new[pkgvfl_prop] = "";
        }
      }

      let pkgexp_old = Object.assign({}, state.pkgexp);
      let pkgexp_new = {};
      for (let pkgexp_prop in pkgexp_old) {
        if (pkgexp_old.hasOwnProperty(pkgexp_prop)) {
          pkgexp_new[pkgexp_prop] = "";
        }
      }

      let flxcat_old = Object.assign({}, state.flxcat);
      let flxcat_new = {};
      for (let flxcat_prop in flxcat_old) {
        if (flxcat_old.hasOwnProperty(flxcat_prop)) {
          flxcat_new[flxcat_prop] = "";
        }
      }

      let tabobj_old = Object.assign({}, state.tabobj);
      let tabobj_new = {};
      for (let tabobj_prop in tabobj_old) {
        if (tabobj_old.hasOwnProperty(tabobj_prop)) {
          tabobj_new[tabobj_prop] = "";
        }
      }
      let reqtype = action.reqtype;
      if (
        reqtype === "tabclick" ||
        (reqtype === "submit" && action.reset_flag === 1)
      ) {
        return {
          ...state,
          pkg_option: action.option,
          loader_flag: false,
          premium_package: false,
          package_vfl: false,
          package_expiry: false,
          flexi_category: false,
          prempkg: prempkg_new,
          pkgvfl: pkgvfl_new,
          pkgexp: pkgexp_new,
          flxcat: flxcat_new,
          tabobj: tabobj_new,
          pkg_updt_resp: {},
          tier2_cities: {},
          tier3_cities: {},
          mumrmt_cities: {},
          delrmt_cities: {},
          kolrmt_cities: {},
          blrrmt_cities: {},
          chnrmt_cities: {},
          punrmt_cities: {},
          hydrmt_cities: {},
          ahmrmt_cities: {},
          cbermt_cities: {},
          jprrmt_cities: {},
          chgrmt_cities: {}
        };
      } else {
        return {
          ...state,
          pkg_option: action.option,
          pkg_updt_resp: {
            ...state.pkg_updt_resp,
            show: 0
          }
        };
      }

    case UPDATE_PACKAGE_BUDGET:
      return {
        ...state,
        loader_flag: false,
        pkg_updt_resp: action.payload
      };
    case TOGGLE_TAB:
      return {
        ...state,
        tabobj: {
          ...state.tabobj,
          [action.tab]: state.tabobj[action.tab] ? "" : action.tab
        }
      };
    case SET_TAB:
      return {
        ...state,
        tabName: action.tab
      };
    case FETCH_PACKAGE_BUDGET:
      let prempkg_updt = Object.assign(state.prempkg, action.prempkg);
      let pkgvfl_updt = Object.assign(state.pkgvfl, action.pkgvfl);
      let pkgexp_updt = Object.assign(state.pkgexp, action.pkgexp);
      let flxcat_updt = Object.assign(state.flxcat, action.flxcat);
      return {
        ...state,
        loader_flag: false,
        premium_package: action.premium_package,
        package_vfl: action.package_vfl,
        package_expiry: action.package_expiry,
        flexi_category: action.flexi_category,
        prempkg: prempkg_updt,
        pkgvfl: pkgvfl_updt,
        pkgexp: pkgexp_updt,
        flxcat: flxcat_updt
      };
    default:
      return state;
  }
}
