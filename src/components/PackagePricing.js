import React, {Component} from "react";
import {connect} from "react-redux";

import {DECIMAL_PRICE} from "../common/constants";
import {isEmpty} from "../utils/helper";
import {setPackagePrice, togglePkgPricingTab} from "../actions";
class PackagePricing extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  togglePackageTab = pkgtab => {
    this.props.togglePkgPricingTab(pkgtab);
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      !isEmpty(prevProps.error_data) &&
      typeof prevProps.error_data.focusinput !== "undefined" &&
      !isEmpty(prevProps.error_data.focusinput) &&
      isEmpty(this.props.error_data)
    ) {
      return prevProps.error_data.focusinput;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null && this.refs[snapshot]) {
      this.refs[snapshot].focus();
    }
  }

  onChange(tab, event) {
    let re = "";
    if (DECIMAL_PRICE.includes(event.target.name)) {
      re = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
    } else {
      re = /^[0-9\b]+$/;
    }

    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.setPackagePrice(tab, event.target.name, event.target.value);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-xs-12 col-sm-10 col-sm-offset-2 maintitle mt20 p0">
          Package
        </div>
        <div className="col-xs-12 col-sm-8 col-sm-offset-2 p0">
          <div className="col-xs-12 p0 bordwrp mt10">
            <div
              className={
                "col-xs-12 p0 typotr bluchk " +
                (this.props["premium_package"] === true ? "subtire" : "")
              }
              href="#premium_package"
              aria-expanded="true"
            >
              <label className="col-xs-12 p0 radinpt ">
                <input
                  type="checkbox"
                  onChange={this.togglePackageTab.bind(this, "premium_package")}
                />

                <span
                  className={
                    "gen_spr rdio_i " +
                    (this.props["premium_package"] === true ? "selchek" : "")
                  }
                />
                <span className="col-xs-12 bluebg">
                  Adwords by Package
                  <i className="gen_spr selarwup_i pull-right" />
                </span>
              </label>
            </div>
            <div
              className={
                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 alocatotr " +
                (this.props["premium_package"] === true ? "in" : "")
              }
              id="premium_package"
              aria-expanded="true"
            >
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="prempkg_ecs"
                    value={this.props.prempkg.prempkg_ecs}
                    onChange={this.onChange.bind(this, "prempkg")}
                    ref={"prempkg_ecs"}
                  />
                  <label>ECS</label>
                </div>
              </div>
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="prempkg_nonecs"
                    value={this.props.prempkg.prempkg_nonecs}
                    onChange={this.onChange.bind(this, "prempkg")}
                    ref={"prempkg_nonecs"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>
              <div className="col-xs-12 mt20 mb20 blklbl">
                Premium (Two Years)
              </div>
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 col-sm-12 p0">
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="prempkg_twoyr_per"
                    value={this.props.prempkg.prempkg_twoyr_per}
                    onChange={this.onChange.bind(this, "prempkg")}
                    ref={"prempkg_twoyr_per"}
                  />
                  <label>Percentage 2nd Year</label>
                </div>
              </div>
              {/*<div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="twoynonecs"
                    value={this.props.prempkg.twoynonecs}
                    onChange={this.onChange.bind(this, "prempkg")}
                  />
                  <label>Non ECS</label>
                </div>
              </div>*/}

              <div className="col-xs-12 mt20 mb20 blklbl">
                Discount on Non ECS
              </div>
              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 col-sm-12 p0">
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="prempkg_disc_per"
                    value={this.props.prempkg.prempkg_disc_per}
                    onChange={this.onChange.bind(this, "prempkg")}
                    ref={"prempkg_disc_per"}
                  />
                  <label>Discount %</label>
                </div>
              </div>
              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="prempkg_disc_eligib"
                    value={this.props.prempkg.prempkg_disc_eligib}
                    onChange={this.onChange.bind(this, "prempkg")}
                    ref={"prempkg_disc_eligib"}
                  />
                  <label>Discount Eligibility</label>
                </div>
              </div>

              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 mt20 mb20 blklbl p0">
                  Three Months
                </div>
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="prempkg_threemon_nonecs"
                    value={this.props.prempkg.prempkg_threemon_nonecs}
                    onChange={this.onChange.bind(this, "prempkg")}
                    ref={"prempkg_threemon_nonecs"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>

              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 mt20 mb20 blklbl p0">
                  City Min Budget
                </div>
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="prempkg_citymin_bdgt"
                    value={this.props.prempkg.prempkg_citymin_bdgt}
                    onChange={this.onChange.bind(this, "prempkg")}
                    ref={"prempkg_citymin_bdgt"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 p0 bordwrp mt10">
            <div
              className={
                "col-xs-12 p0 typotr bluchk " +
                (this.props["package_vfl"] === true ? "subtire" : "")
              }
              href="#package_vfl"
              aria-expanded="true"
            >
              <label className="col-xs-12 p0 radinpt ">
                <input
                  type="checkbox"
                  onChange={this.togglePackageTab.bind(this, "package_vfl")}
                />

                <span
                  className={
                    "gen_spr rdio_i " +
                    (this.props["package_vfl"] === true ? "selchek" : "")
                  }
                />
                <span className="col-xs-12 bluebg">
                  VFL Package
                  <i className="gen_spr selarwup_i pull-right" />
                </span>
              </label>
            </div>
            <div
              className={
                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 alocatotr " +
                (this.props["package_vfl"] === true ? "in" : "")
              }
              id="package_vfl"
              aria-expanded="true"
            >
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgvfl_ecs"
                    value={this.props.pkgvfl.pkgvfl_ecs}
                    onChange={this.onChange.bind(this, "pkgvfl")}
                    ref={"pkgvfl_ecs"}
                  />
                  <label>ECS</label>
                </div>
              </div>
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgvfl_nonecs"
                    value={this.props.pkgvfl.pkgvfl_nonecs}
                    onChange={this.onChange.bind(this, "pkgvfl")}
                    ref={"pkgvfl_nonecs"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>
              <div className="col-xs-12 mt20 mb20 blklbl">
                Custom Minimum Budget
              </div>
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgvfl_ecs_custom"
                    value={this.props.pkgvfl.pkgvfl_ecs_custom}
                    onChange={this.onChange.bind(this, "pkgvfl")}
                    ref={"pkgvfl_ecs_custom"}
                  />
                  <label>ECS</label>
                </div>
              </div>
              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgvfl_nonecs_custom"
                    value={this.props.pkgvfl.pkgvfl_nonecs_custom}
                    onChange={this.onChange.bind(this, "pkgvfl")}
                    ref={"pkgvfl_nonecs_custom"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>
              <div className="col-xs-12 mt20 mb20 blklbl">
                Existing Contracts
              </div>
              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  {/*<i className="gen_spr rup2_i" />*/}
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgvfl_existing_ecs_per"
                    value={this.props.pkgvfl.pkgvfl_existing_ecs_per}
                    onChange={this.onChange.bind(this, "pkgvfl")}
                    ref={"pkgvfl_existing_ecs_per"}
                  />
                  <label>ECS %</label>
                </div>
              </div>
              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  {/*<i className="gen_spr rup2_i" />*/}
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgvfl_existing_nonecs_per"
                    value={this.props.pkgvfl.pkgvfl_existing_nonecs_per}
                    onChange={this.onChange.bind(this, "pkgvfl")}
                    ref={"pkgvfl_existing_nonecs_per"}
                  />
                  <label>Non ECS %</label>
                </div>
              </div>

              <div className="col-xs-12 mt20 mb20 blklbl">Expire Contracts</div>
              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgvfl_expiry_ecs"
                    value={this.props.pkgvfl.pkgvfl_expiry_ecs}
                    onChange={this.onChange.bind(this, "pkgvfl")}
                    ref={"pkgvfl_expiry_ecs"}
                  />
                  <label>ECS</label>
                </div>
              </div>
              <div className="col-xs-6 form-group  inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgvfl_expiry_nonecs"
                    value={this.props.pkgvfl.pkgvfl_expiry_nonecs}
                    onChange={this.onChange.bind(this, "pkgvfl")}
                    ref={"pkgvfl_expiry_nonecs"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 p0 bordwrp mt10">
            <div
              className={
                "col-xs-12 p0 typotr bluchk " +
                (this.props["package_expiry"] === true ? "subtire" : "")
              }
              href="#package_expiry"
              aria-expanded="true"
            >
              <label className="col-xs-12 p0 radinpt ">
                <input
                  type="checkbox"
                  onChange={this.togglePackageTab.bind(this, "package_expiry")}
                />

                <span
                  className={
                    "gen_spr rdio_i " +
                    (this.props["package_expiry"] === true ? "selchek" : "")
                  }
                />
                <span className="col-xs-12 bluebg">
                  Package Expiry
                  <i className="gen_spr selarwup_i pull-right" />
                </span>
              </label>
            </div>
            <div
              className={
                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 alocatotr " +
                (this.props["package_expiry"] === true ? "in" : "")
              }
              id="package_expiry"
              aria-expanded="true"
            >
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgexp_ecs"
                    value={this.props.pkgexp.pkgexp_ecs}
                    onChange={this.onChange.bind(this, "pkgexp")}
                    ref={"pkgexp_ecs"}
                  />
                  <label>ECS</label>
                </div>
              </div>
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgexp_nonecs"
                    value={this.props.pkgexp.pkgexp_nonecs}
                    onChange={this.onChange.bind(this, "pkgexp")}
                    ref={"pkgexp_nonecs"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>
              <div className="col-xs-12 mt20 mb20 blklbl">Two Years</div>
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="pkgexp_twoyr_nonecs"
                    value={this.props.pkgexp.pkgexp_twoyr_nonecs}
                    onChange={this.onChange.bind(this, "pkgexp")}
                    ref={"pkgexp_twoyr_nonecs"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 p0 bordwrp mt10 mb20">
            <div
              className={
                "col-xs-12 p0 typotr bluchk " +
                (this.props["flexi_category"] === true ? "subtire" : "")
              }
              href="#flexi_category"
              aria-expanded="true"
            >
              <label className="col-xs-12 p0 radinpt ">
                <input
                  type="checkbox"
                  onChange={this.togglePackageTab.bind(this, "flexi_category")}
                />

                <span
                  className={
                    "gen_spr rdio_i " +
                    (this.props["flexi_category"] === true ? "selchek" : "")
                  }
                />
                <span className="col-xs-12 bluebg">
                  Adwords by Flexi Category
                  <i className="gen_spr selarwup_i pull-right" />
                </span>
              </label>
            </div>
            <div
              className={
                "col-xs-12 col-sm-10 col-sm-offset-1 areaName collapse p0 mt20 alocatotr " +
                (this.props["flexi_category"] === true ? "in" : "")
              }
              id="flexi_category"
              aria-expanded="true"
            >
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="flxcat_ecs"
                    value={this.props.flxcat.flxcat_ecs}
                    onChange={this.onChange.bind(this, "flxcat")}
                    ref={"flxcat_ecs"}
                  />
                  <label>ECS</label>
                </div>
              </div>
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 p0 prcval">
                  <i className="gen_spr rup2_i" />
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="flxcat_nonecs"
                    value={this.props.flxcat.flxcat_nonecs}
                    onChange={this.onChange.bind(this, "flxcat")}
                    ref={"flxcat_nonecs"}
                  />
                  <label>Non ECS</label>
                </div>
              </div>

              <div className="col-xs-12 mt20 mb20 blklbl">
                Premium (Two Years)
              </div>
              <div className="col-xs-6 form-group inrfrm lblanmt">
                <div className="col-xs-12 col-sm-12 p0">
                  <input
                    type="text"
                    className="form-control anmtlbl"
                    name="flxcat_twoyr_per"
                    value={this.props.flxcat.flxcat_twoyr_per}
                    onChange={this.onChange.bind(this, "flxcat")}
                    ref={"flxcat_twoyr_per"}
                  />
                  <label>Percentage 2nd Year</label>
                </div>
              </div>
            </div>
          </div>

          {/* put those two divs*/}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const prempkg = state.pkgdata.prempkg;
  const pkgvfl = state.pkgdata.pkgvfl;
  const pkgexp = state.pkgdata.pkgexp;
  const flxcat = state.pkgdata.flxcat;
  const premium_package = state.pkgdata.premium_package;
  const package_vfl = state.pkgdata.package_vfl;
  const package_expiry = state.pkgdata.package_expiry;
  const flexi_category = state.pkgdata.flexi_category;
  const error_flag = state.pkgdata.error_flag;
  const error_data = state.pkgdata.error_data;

  return {
    prempkg,
    pkgvfl,
    pkgexp,
    flxcat,
    premium_package,
    package_vfl,
    package_expiry,
    flexi_category,
    error_flag,
    error_data
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setPackagePrice(tab, field, value) {
      dispatch(setPackagePrice(tab, field, value));
    },
    togglePkgPricingTab(tab) {
      dispatch(togglePkgPricingTab(tab));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackagePricing);
