import React, {Component} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import Loader from "./Loader";
import PackagePricing from "./PackagePricing";
import MyAutosuggest from "../utils/MyAutosuggest";
import {
  setLoaderFlag,
  cityData,
  toggleCityData,
  resetCityData,
  toggleError,
  setPackageOptions,
  setPackagePrice,
  updatePackageBudget,
  toggleTab,
  fetchPackageBudget,
  resetPackageBudget
} from "../actions";
import {
  TOPCITIES,
  MAINREMOTELIST,
  TOPCITYPLUSZONE,
  TEAMLIST,
  CITY_TYPE_OBJ
} from "../common/constants";
import PRICE_VALIDATOR from "../common/validateprice";

import {isEmpty} from "../utils/helper";
import Modal from "../utils/Modal";
import _ from "lodash";
class Package extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.optionToggle = this.optionToggle.bind(this);
  }

  handleInput(tab, event) {
    this.props.handleInput(tab, event.target.name, event.target.value);
    switch (tab) {
      case "grouptab":
        let fetch_group = 0;
        let param_grp = {};
        param_grp["type"] = "group";
        if (event.target.name === "city") {
          if (
            !isEmpty(event.target.value) &&
            !isEmpty(this.props.grouptab.group)
          ) {
            fetch_group = 1;
            param_grp["city"] = event.target.value;
            param_grp["group_type"] = this.props.grouptab.group;
          }
        } else if (event.target.name === "group") {
          if (
            !isEmpty(event.target.value) &&
            !isEmpty(this.props.grouptab.city)
          ) {
            fetch_group = 1;
            param_grp["city"] = this.props.grouptab.city;
            param_grp["group_type"] = event.target.value;
          }
        }
        if (fetch_group === 1) {
          this.props.setLoaderFlag("package");
          this.props.fetchPackageBudget(param_grp);
        } else {
          this.props.setPackageOptions("group", "tabclick", null);
        }
        break;
      case "teamtab":
        let fetch_team = 0;
        let param_tm = {};
        param_tm["type"] = "team";
        if (event.target.name === "city") {
          if (
            !isEmpty(event.target.value) &&
            !isEmpty(this.props.teamtab.team)
          ) {
            fetch_team = 1;
            param_tm["city"] = event.target.value;
            param_tm["team_type"] = this.props.teamtab.team;
          }
        } else if (event.target.name === "team") {
          if (
            !isEmpty(event.target.value) &&
            !isEmpty(this.props.teamtab.city)
          ) {
            fetch_team = 1;
            param_tm["city"] = this.props.teamtab.city;
            param_tm["team_type"] = event.target.value;
          }
        }
        if (fetch_team === 1) {
          this.props.setLoaderFlag("package");
          this.props.fetchPackageBudget(param_tm);
        } else {
          this.props.setPackageOptions("team", "tabclick", null);
        }
        break;
      case "contab":
        let fetch_con = 0;
        let param_con = {};
        param_con["type"] = "contractid";
        if (event.target.name === "city") {
          if (!isEmpty(event.target.value) && !isEmpty(this.props.contab.pid)) {
            fetch_con = 1;
            param_con["city"] = event.target.value;
            param_con["parentid"] = this.props.contab.pid;
          }
        } else if (event.target.name === "pid") {
          if (
            !isEmpty(event.target.value) &&
            !isEmpty(this.props.contab.city)
          ) {
            fetch_con = 1;
            param_con["city"] = this.props.contab.city;
            param_con["parentid"] = event.target.value;
          }
        }
        if (fetch_con === 1) {
          this.props.setLoaderFlag("package");
          this.props.fetchPackageBudget(param_con);
        } else {
          this.props.setPackageOptions("contractid", "tabclick", null);
        }
        break;
      default:
        alert("Don't Know, How it came here ?");
    }
  }

  selectAllToggle = (req, type) => {
    let sel_type = "";
    if (CITY_TYPE_OBJ.hasOwnProperty(type)) {
      sel_type = CITY_TYPE_OBJ[type];

      if (isEmpty(this.props[sel_type])) {
        this.props.setLoaderFlag("package");
        this.props.cityData(req, type);
      } else {
        this.props.resetCityData(type);
      }
      this.props.toggleTab(type);
    }
  };

  toggleDropdown = accordtab => {
    this.props.toggleTab(accordtab);
  };

  setOptionsPkg(pkgopt) {
    this.props.setPackageOptions(pkgopt, "tabclick", null);
  }
  resetPkgBudget(pkgopt) {
    console.log(pkgopt);
    let reset_pkg = 1;
    let reset_data = {};
    switch (pkgopt) {
      case "group":
        if (isEmpty(this.props.grouptab.city)) {
          reset_pkg = 0;
          this.showError(
            "Package",
            "Please select city for which you want to reset group budget."
          );
          return false;
        }
        if (isEmpty(this.props.grouptab.group)) {
          reset_pkg = 0;
          this.showError("Package", "Please select name of the group.");
          return false;
        }
        reset_data["city"] = this.props.grouptab.city;
        reset_data["group_type"] = this.props.grouptab.group;

        break;
      case "team":
        if (isEmpty(this.props.teamtab.city)) {
          reset_pkg = 0;
          this.showError(
            "Package",
            "Please select city for which you want to reset team budget."
          );
          return false;
        }
        if (isEmpty(this.props.teamtab.team)) {
          reset_pkg = 0;
          this.showError("Package", "Please select name of the team.");
          return false;
        }
        reset_data["city"] = this.props.teamtab.city;
        reset_data["team_type"] = this.props.teamtab.team;
        break;
      case "user":
        if (isEmpty(this.props.pkg_empcode)) {
          reset_pkg = 0;
          this.showError("Package", "Please select user from autosuggest.");
          return false;
        }
        reset_data["empcode"] = this.props.pkg_empcode;
        break;
      case "contractid":
        if (isEmpty(this.props.contab.city)) {
          reset_pkg = 0;
          this.showError("Package", "Please select contract city.");
          return false;
        }
        if (isEmpty(this.props.contab.pid)) {
          reset_pkg = 0;
          this.showError("Package", "Please enter contractid.");
          return false;
        }
        reset_data["parentid"] = this.props.contab.pid;

        break;
      default:
        alert("Don't Know, How it came here ?");
    }
    if (reset_pkg === 1) {
      reset_data["budget_type"] = pkgopt;
      console.log("call api to reset budget");
      this.props.resetPackageBudget(reset_data);
    }
  }
  submitPackage = () => {
    let pkg_proceed = 1;
    let selected_cities = [];
    switch (this.props.pkg_option) {
      case "city":
        // Logic to extract selected city list

        TOPCITIES.map((topct, idx) => {
          let topctstr = topct + "main";
          if (
            this.props.tabobj.hasOwnProperty(topctstr) &&
            this.props.tabobj[topctstr] !== ""
          ) {
            selected_cities.push(topct);
          }
          return selected_cities;
        });

        for (let prop in CITY_TYPE_OBJ) {
          if (CITY_TYPE_OBJ.hasOwnProperty(prop)) {
            let cttype = CITY_TYPE_OBJ[prop];

            let citytype_obj = {};
            if (
              this.props.tabobj.hasOwnProperty(prop) &&
              this.props.tabobj[prop] === prop
            ) {
              // tab is selected or not
              if (this.props.hasOwnProperty(cttype)) {
                citytype_obj = this.props[cttype];
              }
            }
            if (!isEmpty(citytype_obj)) {
              for (let citynm in citytype_obj) {
                if (citytype_obj[citynm] === true) {
                  selected_cities.push(citynm);
                }
              }
            }
          }
        }
        if (selected_cities.length > 0) {
          selected_cities = _.uniq(_.compact(selected_cities));
        }
        if (selected_cities.length <= 0) {
          pkg_proceed = 0;
          this.showError(
            "Package",
            "Please select atleast one city to update budget."
          );
          return false;
        }
        break;
      case "group":
        if (isEmpty(this.props.grouptab.city)) {
          pkg_proceed = 0;
          this.showError(
            "Package",
            "Please select city for which you want to apply group budget."
          );
          return false;
        }
        if (isEmpty(this.props.grouptab.group)) {
          pkg_proceed = 0;
          this.showError("Package", "Please select name of the group.");
          return false;
        }
        break;
      case "team":
        if (isEmpty(this.props.teamtab.city)) {
          pkg_proceed = 0;
          this.showError(
            "Package",
            "Please select city for which you want to apply team budget."
          );
          return false;
        }
        if (isEmpty(this.props.teamtab.team)) {
          pkg_proceed = 0;
          this.showError("Package", "Please select name of the team.");
          return false;
        }
        break;
      case "user":
        if (isEmpty(this.props.pkg_empcode)) {
          pkg_proceed = 0;
          this.showError("Package", "Please select user from autosuggest.");
          return false;
        }
        break;
      case "contractid":
        if (isEmpty(this.props.contab.city)) {
          pkg_proceed = 0;
          this.showError("Package", "Please select contract city.");
          return false;
        }
        if (isEmpty(this.props.contab.pid)) {
          pkg_proceed = 0;
          this.showError("Package", "Please enter contractid.");
          return false;
        }
        break;
      default:
        alert("Don't Know, How it came here ?");
    }

    // Logic to extract budget details to update
    let pkg_found = 0;
    let pkg_data_obj = {};
    if (pkg_proceed && this.props.premium_package === true) {
      pkg_found = 1;
      let prempkg_sel = this.props.prempkg;
      for (let prop in prempkg_sel) {
        if (prempkg_sel.hasOwnProperty(prop)) {
          if (isEmpty(prempkg_sel[prop])) {
            //this.refs["prempkg_ecs"].focus();

            pkg_proceed = 0;
            this.showError("Package", PRICE_VALIDATOR[prop].emptyerr, prop);
            break;
          } else {
            if (
              PRICE_VALIDATOR[prop].type === "default-int" &&
              parseInt(prempkg_sel[prop], 10) < PRICE_VALIDATOR[prop].min
            ) {
              pkg_proceed = 0;
              this.showError("Package", PRICE_VALIDATOR[prop].typeerr, prop);
              break;
            } else if (
              PRICE_VALIDATOR[prop].type === "default-dec" &&
              prempkg_sel[prop] < PRICE_VALIDATOR[prop].min
            ) {
              pkg_proceed = 0;
              this.showError("Package", PRICE_VALIDATOR[prop].typeerr, prop);
              break;
            } else if (
              PRICE_VALIDATOR[prop].type === "max-compare" &&
              prempkg_sel[prop] > PRICE_VALIDATOR[prop].max
            ) {
              pkg_proceed = 0;
              this.showError("Package", PRICE_VALIDATOR[prop].typeerr, prop);
              break;
            }
          }
        }
      }
      pkg_data_obj = Object.assign(pkg_data_obj, prempkg_sel);
    }
    if (pkg_proceed && this.props.package_vfl === true) {
      pkg_found = 1;
      let pkgvfl_sel = this.props.pkgvfl;
      for (let prop in pkgvfl_sel) {
        if (pkgvfl_sel.hasOwnProperty(prop)) {
          if (isEmpty(pkgvfl_sel[prop])) {
            pkg_proceed = 0;
            this.showError("Package", PRICE_VALIDATOR[prop].emptyerr, prop);
            break;
          } else {
            if (
              PRICE_VALIDATOR[prop].type === "default-int" &&
              parseInt(pkgvfl_sel[prop], 10) < PRICE_VALIDATOR[prop].min
            ) {
              pkg_proceed = 0;
              this.showError("Package", PRICE_VALIDATOR[prop].typeerr, prop);
              break;
            } else if (
              PRICE_VALIDATOR[prop].type === "default-dec" &&
              pkgvfl_sel[prop] < PRICE_VALIDATOR[prop].min
            ) {
              pkg_proceed = 0;
              this.showError("Package", PRICE_VALIDATOR[prop].typeerr, prop);
              break;
            }
          }
        }
      }
      pkg_data_obj = Object.assign(pkg_data_obj, pkgvfl_sel);
    }
    if (pkg_proceed && this.props.package_expiry === true) {
      pkg_found = 1;
      let pkgexp_sel = this.props.pkgexp;
      for (let prop in pkgexp_sel) {
        if (pkgexp_sel.hasOwnProperty(prop)) {
          if (isEmpty(pkgexp_sel[prop])) {
            pkg_proceed = 0;
            this.showError("Package", PRICE_VALIDATOR[prop].emptyerr, prop);
            break;
          } else {
            if (
              PRICE_VALIDATOR[prop].type === "default-int" &&
              parseInt(pkgexp_sel[prop], 10) < PRICE_VALIDATOR[prop].min
            ) {
              pkg_proceed = 0;
              this.showError("Package", PRICE_VALIDATOR[prop].typeerr, prop);
              break;
            }
          }
        }
      }
      pkg_data_obj = Object.assign(pkg_data_obj, pkgexp_sel);
    }
    if (pkg_proceed && this.props.flexi_category === true) {
      pkg_found = 1;
      let flxcat_sel = this.props.flxcat;
      for (let prop in flxcat_sel) {
        if (flxcat_sel.hasOwnProperty(prop)) {
          if (isEmpty(flxcat_sel[prop])) {
            pkg_proceed = 0;
            this.showError("Package", PRICE_VALIDATOR[prop].emptyerr, prop);
            break;
          } else {
            if (
              PRICE_VALIDATOR[prop].type === "default-int" &&
              parseInt(flxcat_sel[prop], 10) < PRICE_VALIDATOR[prop].min
            ) {
              pkg_proceed = 0;
              this.showError("Package", PRICE_VALIDATOR[prop].typeerr, prop);
              break;
            } else if (
              PRICE_VALIDATOR[prop].type === "default-dec" &&
              flxcat_sel[prop] < PRICE_VALIDATOR[prop].min
            ) {
              pkg_proceed = 0;
              this.showError("Package", PRICE_VALIDATOR[prop].typeerr, prop);
              break;
            }
          }
        }
      }
      pkg_data_obj = Object.assign(pkg_data_obj, flxcat_sel);
    }
    if (pkg_found !== 1) {
      pkg_proceed = 0;
      this.showError(
        "Package",
        "Please select Adwords by Package / VFL Package / Package Expiry/ Adwords by Flexi Category tab to update budget."
      );
      return false;
    }
    // Preparing data to submit
    if (pkg_proceed === 1) {
      let submit_data = {};
      switch (this.props.pkg_option) {
        case "city":
          submit_data["city"] = selected_cities.join(",");
          submit_data["package"] = pkg_data_obj;
          this.props.setLoaderFlag("package");
          this.props.updatePackageBudget(this.props.pkg_option, submit_data);
          break;
        case "group":
          submit_data["city"] = this.props.grouptab.city;
          let selected_group = this.props.grouptab.group
            .replace(/All/i, "")
            .trim();
          selected_group = selected_group.toLowerCase();
          submit_data[selected_group] = {};
          submit_data[selected_group]["package"] = pkg_data_obj;
          this.props.setLoaderFlag("package");
          this.props.updatePackageBudget(this.props.pkg_option, submit_data);
          break;
        case "team":
          submit_data["city"] = this.props.teamtab.city;
          let selected_team = this.props.teamtab.team.toLowerCase();
          submit_data[selected_team] = {};
          submit_data[selected_team]["package"] = pkg_data_obj;
          this.props.setLoaderFlag("package");
          this.props.updatePackageBudget(this.props.pkg_option, submit_data);
          break;
        case "user":
          submit_data["empcode"] = this.props.pkg_empcode;
          submit_data["empname"] = this.props.pkg_empauto;
          submit_data["package"] = pkg_data_obj;
          this.props.setLoaderFlag("package");
          this.props.updatePackageBudget(this.props.pkg_option, submit_data);
          break;
        case "contractid":
          submit_data["city"] = this.props.contab.city;
          submit_data["parentid"] = this.props.contab.pid;
          submit_data["package"] = pkg_data_obj;
          this.props.setLoaderFlag("package");
          this.props.updatePackageBudget(this.props.pkg_option, submit_data);

          break;

        default:
          alert("Don't Know, How it reached here ?");
      }

      console.log(
        this.props.pkg_option,
        selected_cities,
        pkg_data_obj,
        submit_data
      );
    }
  };

  showError = (camp, message, focusinput = null) => {
    let err_obj = {};
    err_obj["camp"] = camp;
    err_obj["show"] = 1;
    err_obj["message"] = message;
    err_obj["header"] = "ERROR !!!";
    err_obj["focusinput"] = "";
    if (focusinput !== null) {
      err_obj["focusinput"] = focusinput;
    }
    this.props.toggleError(err_obj);
  };

  hideModal = type => {
    if (type === "submit") {
      let reset_flag = this.props.pkg_updt_resp.reset;
      this.props.setPackageOptions(this.props.pkg_option, "submit", reset_flag);
    } else {
      let err_obj = {};
      err_obj["show"] = 0;
      this.props.toggleError(err_obj);
    }
  };

  optionToggle = (type, seldata) => {
    this.props.toggleCityData(type, seldata);
  };

  renderCityList(type) {
    let city_prop = "";
    if (CITY_TYPE_OBJ.hasOwnProperty(type)) {
      city_prop = CITY_TYPE_OBJ[type];
    }
    if (Object.keys(this.props[city_prop]).length > 0) {
      return Object.keys(this.props[city_prop]).map((ctname, idx) => {
        let chkflg = this.props[city_prop][ctname];
        return (
          <span className="col-xs-12 typotr pt10 pb10" key={idx}>
            <label className="col-xs-12 p0 radinpt">
              <input
                type="checkbox"
                checked={false}
                onChange={this.optionToggle.bind(this, type, ctname)}
              />
              <span
                className={
                  "gen_spr rdio_i " + (chkflg === true ? "selchek" : "")
                }
              />
              <span className="col-xs-10 bluebg">{ctname}</span>
            </label>
          </span>
        );
      });
    }
  }
  renderCityAndZone() {
    return TOPCITYPLUSZONE.map((ctname, idx) => {
      let ctval = ctname.replace(/\s/g, "").toLowerCase();
      return (
        <React.Fragment key={idx}>
          <option value={ctval}>{ctname}</option>
        </React.Fragment>
      );
    });
  }
  renderMainRemote() {
    return MAINREMOTELIST.map((ctname, idx) => {
      return (
        <React.Fragment key={idx}>
          <option value={ctname}>{ctname}</option>
        </React.Fragment>
      );
    });
  }
  renderTeam() {
    return Object.keys(TEAMLIST).map((team, idx) => {
      let teamname = TEAMLIST[team];
      return (
        <React.Fragment key={idx}>
          <option value={team}>{teamname}</option>
        </React.Fragment>
      );
    });
  }
  render() {
    return (
      <div className="container mid-otr posbgt">
        {this.props.loader_flag ? <Loader /> : null}
        {this.props.error_flag ? (
          <Modal
            onDismiss={this.hideModal.bind(this, "error")}
            modal_data={this.props.error_data}
          />
        ) : null}
        {!isEmpty(this.props.pkg_updt_resp) &&
        typeof this.props.pkg_updt_resp.show !== "undefined" &&
        this.props.pkg_updt_resp.show === 1 ? (
          <Modal
            onDismiss={this.hideModal.bind(this, "submit")}
            modal_data={this.props.pkg_updt_resp}
          />
        ) : null}

        <div className="col-xs-12 dp0">
          <div className="col-xs-12 mop0 tab-content mb20">
            <div role="tabpanel" className="tab-pane active" id="package">
              <div className="col-xs-12 dwhtbg attrnw">
                <div className="col-xs-12 p0 botmbord">
                  <div className="col-xs-12 col-sm-10 col-sm-offset-2 businfo">
                    <div className="col-xs-12 p0 hdlbl">
                      <ul className="pull-left nav nav-tabs" role="tablist">
                        <li
                          role="presentation"
                          className={
                            this.props.pkg_option === "city" ? "active" : "na"
                          }
                        >
                          <a onClick={this.setOptionsPkg.bind(this, "city")}>
                            City
                          </a>
                        </li>

                        <li
                          role="presentation"
                          className={
                            this.props.pkg_option === "group" ? "active" : "na"
                          }
                        >
                          <a onClick={this.setOptionsPkg.bind(this, "group")}>
                            Group
                          </a>
                        </li>

                        <li
                          role="presentation"
                          className={
                            this.props.pkg_option === "team" ? "active" : "na"
                          }
                        >
                          <a onClick={this.setOptionsPkg.bind(this, "team")}>
                            Team
                          </a>
                        </li>

                        <li
                          role="presentation"
                          className={
                            this.props.pkg_option === "user" ? "active" : "na"
                          }
                        >
                          <a onClick={this.setOptionsPkg.bind(this, "user")}>
                            User
                          </a>
                        </li>

                        <li
                          role="presentation"
                          className={
                            this.props.pkg_option === "contractid"
                              ? "active"
                              : "na"
                          }
                        >
                          <a
                            onClick={this.setOptionsPkg.bind(
                              this,
                              "contractid"
                            )}
                          >
                            Contract ID
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {this.props.pkg_option === "city" && (
                  <div role="tabpanel" className="tab-pane active" id="city">
                    <div className="col-xs-12 p0">
                      <div className="col-xs-5 pull-right mt10 mb10 text-right" />
                      <div className="col-xs-12 col-sm-10 col-sm-offset-2 maintitle p0">
                        Main Cities
                      </div>
                      <div className="col-xs-12 col-sm-8 col-sm-offset-2 boxborder mt10">
                        <div
                          className="col-xs-12 p0 mt10 mb10"
                          data-toggle="collapse"
                          href="#maincity"
                          aria-expanded="true"
                        >
                          <input
                            type="text"
                            placeholder="Select Cities"
                            className="selciy"
                          />
                          <i className="gen_spr selarwup_i" />
                        </div>
                      </div>
                      <div
                        className="col-xs-12 col-sm-8 col-sm-offset-2 mt10 areaName collapse p0"
                        id="maincity"
                        aria-expanded="true"
                      >
                        <div className="col-xs-12 p0 citywrpp">
                          <ul className="col-xs-12 p0">
                            {TOPCITIES.map((topcity, idx) => {
                              let mainstr = topcity + "main";
                              return (
                                <li
                                  key={idx}
                                  className={
                                    "col-xs-12 p0 typotr bluchk " +
                                    (this.props.tabobj[mainstr] === mainstr
                                      ? "inptcheck"
                                      : "")
                                  }
                                >
                                  <label className="col-xs-12 p0 radinpt mb10">
                                    <input
                                      type="checkbox"
                                      checked={false}
                                      onChange={this.toggleDropdown.bind(
                                        this,
                                        mainstr
                                      )}
                                    />
                                    <span className="gen_spr rdio_i" />
                                    <span className="col-xs-12 bluebg">
                                      {topcity}
                                    </span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      <div className="col-xs-12 col-sm-10 col-sm-offset-2 maintitle mt20 p0">
                        Remote Cities
                      </div>
                      <div className="col-xs-12 col-sm-8 col-sm-offset-2 boxborder mt10">
                        <div
                          className="col-xs-12 p0 mt10 mb10"
                          data-toggle="collapse"
                          href="#remotecity"
                          aria-expanded="true"
                        >
                          <input
                            type="text"
                            placeholder="Select Cities"
                            className="selciy"
                          />
                          <i className="gen_spr selarwup_i" />
                        </div>
                      </div>

                      <div
                        className="col-xs-12 col-sm-8 col-sm-offset-2 mt10 areaName collapse p0"
                        id="remotecity"
                        aria-expanded="true"
                      >
                        <div className="col-xs-12 p0">
                          {/* Remote Tier 2 */}
                          <div className="col-xs-12 p0 bordwrp">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["tier2"] === "tier2"
                                  ? "subtire"
                                  : "")
                              }
                              href="#tire2"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "tier_wise",
                                    "tier2"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["tier2"] === "tier2"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Tier 2 Remote Cities
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["tier2"] === "tier2"
                                  ? "show"
                                  : "hide")
                              }
                              id="tire2"
                              aria-expanded="true"
                            >
                              {this.renderCityList("tier2")}
                            </div>
                          </div>

                          {/* Remote Tier 3 */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["tier3"] === "tier3"
                                  ? "subtire"
                                  : "")
                              }
                              href="#tire3"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "tier_wise",
                                    "tier3"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["tier3"] === "tier3"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Tier 3 Remote Cities
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["tier3"] === "tier3"
                                  ? "show"
                                  : "hide")
                              }
                              id="tire3"
                              aria-expanded="true"
                            >
                              {this.renderCityList("tier3")}
                            </div>
                          </div>

                          {/* Mumbai Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_mum"] === "zone_mum"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_mum"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_mum"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_mum"] ===
                                    "zone_mum"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Mumbai Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_mum"] === "zone_mum"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_mum"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_mum")}
                            </div>
                          </div>

                          {/* Delhi Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_del"] === "zone_del"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_del"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_del"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_del"] ===
                                    "zone_del"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Delhi Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_del"] === "zone_del"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_del"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_del")}
                            </div>
                          </div>

                          {/* Kolkata Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_kol"] === "zone_kol"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_kol"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_kol"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_kol"] ===
                                    "zone_kol"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Kolkata Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_kol"] === "zone_kol"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_kol"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_kol")}
                            </div>
                          </div>

                          {/* Bangalore Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_blr"] === "zone_blr"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_blr"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_blr"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_blr"] ===
                                    "zone_blr"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Bangalore Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_blr"] === "zone_blr"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_blr"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_blr")}
                            </div>
                          </div>

                          {/* Chennai Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_chn"] === "zone_chn"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_chn"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_chn"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_chn"] ===
                                    "zone_chn"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Chennai Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_chn"] === "zone_chn"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_chn"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_chn")}
                            </div>
                          </div>

                          {/* Pune Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_pun"] === "zone_pun"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_pun"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_pun"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_pun"] ===
                                    "zone_pun"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Pune Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_pun"] === "zone_pun"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_pun"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_pun")}
                            </div>
                          </div>

                          {/* Hyderabad Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_hyd"] === "zone_hyd"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_hyd"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_hyd"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_hyd"] ===
                                    "zone_hyd"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Hyderabad Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_hyd"] === "zone_hyd"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_hyd"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_hyd")}
                            </div>
                          </div>

                          {/* Ahmedabad Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_ahm"] === "zone_ahm"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_ahm"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_ahm"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_ahm"] ===
                                    "zone_ahm"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Ahmedabad Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_ahm"] === "zone_ahm"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_ahm"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_ahm")}
                            </div>
                          </div>

                          {/* Coimbatore Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_cbe"] === "zone_cbe"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_cbe"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_cbe"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_cbe"] ===
                                    "zone_cbe"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Coimbatore Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_cbe"] === "zone_cbe"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_cbe"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_cbe")}
                            </div>
                          </div>

                          {/* Jaipur Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_jpr"] === "zone_jpr"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_jpr"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_jpr"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_jpr"] ===
                                    "zone_jpr"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Jaipur Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_jpr"] === "zone_jpr"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_jpr"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_jpr")}
                            </div>
                          </div>

                          {/* Chandigarh Zone */}
                          <div className="col-xs-12 p0 bordwrp mt10">
                            <div
                              className={
                                "col-xs-12 p0 typotr bluchk collapsed " +
                                (this.props.tabobj["zone_chg"] === "zone_chg"
                                  ? "subtire"
                                  : "")
                              }
                              href="#zone_chg"
                              aria-expanded="true"
                            >
                              <label className="col-xs-12 p0 radinpt">
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onChange={this.selectAllToggle.bind(
                                    this,
                                    "zone_wise",
                                    "zone_chg"
                                  )}
                                />
                                <span
                                  className={
                                    "gen_spr rdio_i " +
                                    (this.props.tabobj["zone_chg"] ===
                                    "zone_chg"
                                      ? "selchek"
                                      : "")
                                  }
                                />
                                <span className="col-xs-12 bluebg">
                                  Chandigarh Remote
                                  <i className="gen_spr selarwup_i pull-right" />
                                </span>
                              </label>
                            </div>
                            <div
                              className={
                                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 overlistdiv " +
                                (this.props.tabobj["zone_chg"] === "zone_chg"
                                  ? "show"
                                  : "hide")
                              }
                              id="zone_chg"
                              aria-expanded="true"
                            >
                              {this.renderCityList("zone_chg")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <PackagePricing />
                    </div>
                    <div className="col-xs-12 text-center ftrbtn btncel mt20">
                      <button
                        className="btn btn-primary"
                        onClick={this.submitPackage}
                      >
                        ProceedC
                      </button>
                    </div>
                  </div>
                )}
                {this.props.pkg_option === "group" && (
                  <div role="tabpanel" className="tab-pane active" id="grup">
                    <div className="col-xs-12 col-sm-12 mt10">
                      <div className="col-xs-12 p0">
                        <div className="col-xs-5 pull-right mt10 mb10 text-right">
                          <a
                            onClick={this.resetPkgBudget.bind(this, "group")}
                            className="resetciyt"
                          >
                            Reset <i className="gen_spr rest_i" />
                          </a>
                        </div>
                        <div className="col-xs-12 col-sm-10 col-sm-offset-2 p0">
                          <div className="col-xs-12 col-sm-4 form-group businfo slctotr mt20">
                            <select
                              className="form-control"
                              name="city"
                              value={this.props.grouptab.city}
                              onChange={this.handleInput.bind(this, "grouptab")}
                            >
                              <option value="">Select City</option>
                              {this.renderCityAndZone()}
                            </select>
                          </div>

                          <div className="col-xs-12 col-sm-4 form-group businfo slctotr mt20">
                            <select
                              className="form-control"
                              name="group"
                              value={this.props.grouptab.group}
                              onChange={this.handleInput.bind(this, "grouptab")}
                            >
                              <option value="">Select Group</option>
                              <option value="tme">All TME </option>
                              <option value="me">All ME </option>
                              <option value="jda">All JDA </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <PackagePricing />
                    </div>

                    <div className="col-xs-12 text-center ftrbtn btncel mt20">
                      <button
                        className="btn btn-primary"
                        onClick={this.submitPackage}
                      >
                        ProceedG
                      </button>
                    </div>
                  </div>
                )}
                {this.props.pkg_option === "team" && (
                  <div role="tabpanel" className="tab-pane active" id="team">
                    <div className="col-xs-12 col-sm-12 mt10">
                      <div className="col-xs-12 p0">
                        <div className="col-xs-5 pull-right mt10 mb10 text-right">
                          <a
                            onClick={this.resetPkgBudget.bind(this, "team")}
                            className="resetciyt"
                          >
                            Reset <i className="gen_spr rest_i" />
                          </a>
                        </div>
                        <div className="col-xs-12 col-sm-10 col-sm-offset-2 p0">
                          <div className="col-xs-12 col-sm-4 form-group businfo slctotr mt20">
                            <select
                              className="form-control"
                              name="city"
                              value={this.props.teamtab.city}
                              onChange={this.handleInput.bind(this, "teamtab")}
                            >
                              <option value="">Select City</option>
                              {this.renderCityAndZone()}
                            </select>
                          </div>

                          <div className="col-xs-12 col-sm-4 form-group businfo slctotr mt20">
                            <select
                              className="form-control"
                              name="team"
                              value={this.props.teamtab.team}
                              onChange={this.handleInput.bind(this, "teamtab")}
                            >
                              <option value="">Select Team</option>
                              {this.renderTeam()}
                            </select>
                          </div>
                        </div>
                      </div>
                      <PackagePricing />
                    </div>
                    <div className="col-xs-12 text-center ftrbtn btncel mt20">
                      <button
                        className="btn btn-primary"
                        onClick={this.submitPackage}
                      >
                        ProceedT
                      </button>
                    </div>
                  </div>
                )}
                {this.props.pkg_option === "user" && (
                  <div role="tabpanel" className="tab-pane active" id="user">
                    <div className="col-xs-12 col-sm-12 mt10">
                      <div className="col-xs-12 p0">
                        <div className="col-xs-5 pull-right mt10 mb10 text-right">
                          <a
                            onClick={this.resetPkgBudget.bind(this, "user")}
                            className="resetciyt"
                          >
                            Reset <i className="gen_spr rest_i" />
                          </a>
                        </div>
                        <div className="col-xs-12 col-sm-10 col-sm-offset-2 p0">
                          <div className="col-xs-12 form-group inrfrm lblanmt p0">
                            <div className="col-xs-12 col-sm-3 lineagebtn">
                              <MyAutosuggest
                                id="pkgempauto"
                                placeholder="Search User"
                                value={this.props.pkg_empauto}
                                onChange={this.onChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <PackagePricing />
                    </div>
                    <div className="col-xs-12 text-center ftrbtn btncel mt20">
                      <button
                        className="btn btn-primary"
                        onClick={this.submitPackage}
                      >
                        ProceedU
                      </button>
                    </div>
                  </div>
                )}
                {this.props.pkg_option === "contractid" && (
                  <div role="tabpanel" className="tab-pane active" id="conrtid">
                    <div className="col-xs-12 col-sm-12 mt10">
                      <div className="col-xs-12 p0">
                        <div className="col-xs-5 pull-right mt10 mb10 text-right">
                          <a
                            onClick={this.resetPkgBudget.bind(
                              this,
                              "contractid"
                            )}
                            className="resetciyt"
                          >
                            Reset <i className="gen_spr rest_i" />
                          </a>
                        </div>
                        <div className="col-xs-12 col-sm-10 col-sm-offset-2 p0">
                          <div className="col-xs-12 form-group inrfrm lblanmt p0">
                            {/*
                            <div className="col-xs-12 col-sm-3 lineagebtn p0">
                              <input type="text" className="form-control" />
                              <label>Search City</label>
                            </div>*/}

                            <div className="col-xs-12 col-sm-4 p0 form-group businfo slctotr mt20">
                              <select
                                className="form-control"
                                name="city"
                                value={this.props.contab.city}
                                onChange={this.handleInput.bind(this, "contab")}
                              >
                                <option value="">Select City</option>
                                {this.renderMainRemote()}
                              </select>
                            </div>
                            <div className="col-xs-12 col-sm-3 lineagebtn p0">
                              <input
                                type="text"
                                className="form-control"
                                name="pid"
                                value={this.props.contab.pid}
                                onChange={this.handleInput.bind(this, "contab")}
                                placeholder="Parentid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <PackagePricing />
                    </div>
                    <div className="col-xs-12 text-center ftrbtn btncel mt20">
                      <button
                        className="btn btn-primary"
                        onClick={this.submitPackage}
                      >
                        ProceedC
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loader_flag = state.pkgdata.loader_flag;
  const error_flag = state.pkgdata.error_flag;
  const error_data = state.pkgdata.error_data;
  const tier2_cities = state.pkgdata.tier2_cities;
  const tier3_cities = state.pkgdata.tier3_cities;
  const mumrmt_cities = state.pkgdata.mumrmt_cities;
  const delrmt_cities = state.pkgdata.delrmt_cities;
  const kolrmt_cities = state.pkgdata.kolrmt_cities;
  const blrrmt_cities = state.pkgdata.blrrmt_cities;
  const chnrmt_cities = state.pkgdata.chnrmt_cities;
  const punrmt_cities = state.pkgdata.punrmt_cities;
  const hydrmt_cities = state.pkgdata.hydrmt_cities;
  const ahmrmt_cities = state.pkgdata.ahmrmt_cities;
  const cbermt_cities = state.pkgdata.cbermt_cities;
  const jprrmt_cities = state.pkgdata.jprrmt_cities;
  const chgrmt_cities = state.pkgdata.chgrmt_cities;
  const prempkg = state.pkgdata.prempkg;
  const pkgvfl = state.pkgdata.pkgvfl;
  const pkgexp = state.pkgdata.pkgexp;
  const flxcat = state.pkgdata.flxcat;
  const pkg_empauto = state.autodata.pkg_empauto;
  const pkg_empcode = state.autodata.pkg_empcode;
  const premium_package = state.pkgdata.premium_package;
  const package_vfl = state.pkgdata.package_vfl;
  const package_expiry = state.pkgdata.package_expiry;
  const flexi_category = state.pkgdata.flexi_category;
  const pkg_option = state.pkgdata.pkg_option;
  const grouptab = state.pkgdata.grouptab;
  const teamtab = state.pkgdata.teamtab;
  const contab = state.pkgdata.contab;
  const pkg_updt_resp = state.pkgdata.pkg_updt_resp;
  const tabobj = state.pkgdata.tabobj;

  return {
    loader_flag,
    error_flag,
    error_data,
    tier2_cities,
    tier3_cities,
    mumrmt_cities,
    delrmt_cities,
    kolrmt_cities,
    blrrmt_cities,
    chnrmt_cities,
    punrmt_cities,
    hydrmt_cities,
    ahmrmt_cities,
    cbermt_cities,
    jprrmt_cities,
    chgrmt_cities,
    prempkg,
    pkgvfl,
    pkgexp,
    flxcat,
    pkg_empauto,
    pkg_empcode,
    premium_package,
    package_vfl,
    package_expiry,
    flexi_category,
    pkg_option,
    grouptab,
    teamtab,
    contab,
    pkg_updt_resp,
    tabobj
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoaderFlag(source) {
      dispatch(setLoaderFlag(source));
    },
    cityData(req, type) {
      dispatch(cityData(req, type));
    },
    toggleCityData(type, seldata) {
      dispatch(toggleCityData(type, seldata));
    },
    resetCityData(type, seldata) {
      dispatch(resetCityData(type, seldata));
    },
    toggleError(errinfo) {
      dispatch(toggleError(errinfo));
    },
    setPackageOptions(pkgopt, type, reset_flag) {
      dispatch(setPackageOptions(pkgopt, type, reset_flag));
    },
    handleInput(tab, field, value) {
      dispatch(setPackagePrice(tab, field, value));
    },
    updatePackageBudget(type, data) {
      dispatch(updatePackageBudget(type, data));
    },
    toggleTab(tab) {
      dispatch(toggleTab(tab));
    },
    fetchPackageBudget(param_obj) {
      dispatch(fetchPackageBudget(param_obj));
    },
    resetPackageBudget(reset_data) {
      dispatch(resetPackageBudget(reset_data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Package);
