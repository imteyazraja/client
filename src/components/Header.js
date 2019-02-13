import React, {Component} from "react";
import {connect} from "react-redux";
import Package from "./Package";
import {setTab, toggleTab} from "../actions";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    console.log(window.UNAME);
  }
  setTab(tab) {
    this.props.setTab(tab);
  }
  renderComponent() {
    switch (this.props.tabName) {
      case "pkg":
        return <Package />;
      default:
        return "Coming Soon ...";
    }
  }
  closeSide = () => {
    console.log("close");
    this.props.toggleTab("showside");
  };

  render() {
    return (
      <div>
        <header className="pull-left col-xs-12 dropdown">
          <a className="pull-left gen_spr navtb" onClick={this.closeSide}>
            &nbsp;
          </a>

          <h1 className="pull-left genio_nm">Genio Campaign Budget</h1>

          <div className="col-xs-4 pull-right loginwrpp p0">
            <a
              onClick={e => {
                e.preventDefault();
              }}
            >
              Imteyaz Raja
            </a>
          </div>
        </header>
        <span
          className={
            "gen_spr lhs_ovrly " +
            (this.props.tabobj["showside"] === "showside"
              ? "showdiv"
              : "hidediv")
          }
          onClick={this.closeSide}
        />
        <div
          className={
            "lhs_mnu " +
            (this.props.tabobj["showside"] === "showside" ? "active" : "")
          }
        >
          <div className="col-xs-12 bluhd">
            <span className="cel nm">JD Genio</span>
          </div>
          <div className="col-xs-12 p0 scrollhs bluscrl">
            <div
              className="col-xs-12 p0 panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              <div className="col-xs-12 p0 panel panel-default">
                <a
                  onClick={e => {
                    e.preventDefault();
                  }}
                  className="col-xs-12 lhslink"
                >
                  Home
                </a>
                <a
                  onClick={e => {
                    e.preventDefault();
                  }}
                  className="col-xs-12 lhslink"
                >
                  New Business
                </a>
                <a
                  onClick={e => {
                    e.preventDefault();
                  }}
                  className="col-xs-12 lhslink"
                >
                  Deal Closed
                </a>
              </div>
            </div>
          </div>
        </div>
        <section className="pull-left col-xs-12 p0 midsec budgtnew campbug">
          <div className="businfo">
            <div className="col-xs-12 p0 hdlbl mb20">
              <ul className="pull-left nav nav-tabs" role="tablist">
                {/*<li
                  role="presentation"
                  className={this.props["tabName"] === "h2l" ? "active" : "na"}
                >
                  <a onClick={this.setTab.bind(this, "h2l")}>
                    Highest To Lowest
                  </a>
                </li>*/}
                <li
                  role="presentation"
                  className={this.props["tabName"] === "pkg" ? "active" : "na"}
                >
                  <a onClick={this.setTab.bind(this, "pkg")}>Package</a>
                </li>
                {/*
                <li
                  role="presentation"
                  className={this.props["tabName"] === "pdg" ? "active" : "na"}
                >
                  <a onClick={this.setTab.bind(this, "pdg")}>PDG</a>
                </li>
                <li
                  role="presentation"
                  className={this.props["tabName"] === "nl" ? "active" : "na"}
                >
                  <a onClick={this.setTab.bind(this, "nl")}>National Listing</a>
                </li>
                <li
                  role="presentation"
                  className={this.props["tabName"] === "web" ? "active" : "na"}
                >
                  <a onClick={this.setTab.bind(this, "web")}>Website Plan</a>
                </li>
                <li
                  role="presentation"
                  className={this.props["tabName"] === "bnr" ? "active" : "na"}
                >
                  <a onClick={this.setTab.bind(this, "bnr")}>Banner</a>
                </li>
                <li
                  role="presentation"
                  className={this.props["tabName"] === "jdrr" ? "active" : "na"}
                >
                  <a onClick={this.setTab.bind(this, "jdrr")}>JDRR</a>
                </li>
                <li
                  role="presentation"
                  className={this.props["tabName"] === "misc" ? "active" : "na"}
                >
                  <a onClick={this.setTab.bind(this, "misc")}>Miscellaneous</a>
                </li>*/}
              </ul>
            </div>
          </div>
          {this.renderComponent()}
        </section>
      </div>
    );
  }
}
/*function mapStateToProps(state) {
  return { auth: state.auth };
}*/

function mapStateToProps(state) {
  const auth = state.auth;
  const tabName = state.pkgdata.tabName;
  const tabobj = state.pkgdata.tabobj;

  return {
    auth,
    tabName,
    tabobj
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setTab(tab) {
      dispatch(setTab(tab));
    },
    toggleTab(tab) {
      dispatch(toggleTab(tab));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
