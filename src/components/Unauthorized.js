import React, {Component} from "react";

class Unauthorized extends Component {
  redirectToHome = () => {
    window.location = "http://accounts.justdial.com";
  };
  render() {
    return (
      <section className="pull-left col-xs-12 p0 midsec budgtnew campbug">
        <div className="businfo">
          <div className="col-xs-12 p0 hdlbl mb20" />
        </div>
        <div className="container mid-otr posbgt mt20">
          <div className="col-xs-12 whtsec mt20">
            <span className="col-xs-12 hd text-center mt20 mb20" />
            <span className="col-xs-12 text-center">
              <i className="nt-accs" />
            </span>
            <p className="col-xs-12 text-center mt20 mb20 para">
              You dont have access to view / update Genio Campaign Budget.
            </p>
            <div className="col-xs-12 text-center mt20 mb20">
              <button
                className="btn btn-primary w30"
                onClick={this.redirectToHome}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Unauthorized;
