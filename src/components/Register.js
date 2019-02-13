import React, {Component} from "react";
import {connect} from "react-redux";
import {registerUser} from "../actions";
import helper from "../utils/helper";
const $ = window.$;
class Register extends Component {
  constructor() {
    super();
    this.state = {
      empcode: "",
      empname: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert() {
    $("#restchng").hide();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({errors: nextProps.errors});
  //   }
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!helper.isEmpty(nextProps.register_data)) {
      if (nextProps.register_data.errorcode === 0) {
        $("#restchng").hide();
        $("#alerthdr").text("SUCCESS !!!");
        $("#alertdata").text("Registration Done Successfully");
        $("#alertusr").show();
        return null;
      } else {
        alert("Something wrong while registering user.");
        return null;
      }
    }
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
    return null;
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      empcode: this.state.empcode,
      empname: this.state.empname
    };

    this.props.registerUser(newUser);
  }

  render() {
    const {errors} = this.state;
    return (
      <div id="restchng" className="modal">
        <div className="modal-content animated fadeInDown">
          <span className="gen_spr close" onClick={this.closeAlert} />
          <div className="modalhead">Register</div>
          <div className="modalcontain">
            <div className="form-group">
              <input
                type="text"
                className={
                  "form-control form-control-lg " +
                  (errors.empcode ? "is-invalid" : "")
                }
                placeholder="Employee Code"
                name="empcode"
                value={this.state.empcode}
                onChange={this.onChange}
                autoComplete="off"
              />
              {errors.empcode && (
                <div className="invalid-feedback">{errors.empcode}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={
                  "form-control form-control-lg " +
                  (errors.empname ? "is-invalid" : "")
                }
                placeholder="Employee Name"
                name="empname"
                value={this.state.empname}
                onChange={this.onChange}
                autoComplete="off"
              />
              {errors.empname && (
                <div className="invalid-feedback">{errors.empname}</div>
              )}
            </div>
          </div>
          <div align="center" className="modfoot wrapper">
            <span>
              <button
                className="btn btn-primary open-modal width120"
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.commondata.errors,
  register_data: state.auth.register_data
});

export default connect(
  mapStateToProps,
  {registerUser}
)(Register);
