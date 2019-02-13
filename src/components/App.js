import React, {Component} from "react";
import {connect} from "react-redux";
import {setLoaderFlag, fetchUser} from "../actions";
import Loader from "./Loader";
import Header from "./Header";
import Unauthorized from "./Unauthorized";

class App extends Component {
  componentDidMount() {
    console.log("ucode : " + window.UCODE);
    let ucode = window.UCODE;
    this.props.setLoaderFlag("auth");
    this.props.fetchUser(ucode);
  }
  render() {
    return (
      <div>
        {this.props.loader_flag || this.props.auth_flag === null ? (
          <Loader />
        ) : null}
        {this.props.auth_flag ? <Header /> : null}

        {this.props.auth_flag === false ? <Unauthorized /> : null}
      </div>
    );
  }
}

/*export default connect(
  null,
  actions
)(App);*/

function mapStateToProps(state) {
  const loader_flag = state.auth.loader_flag;
  const auth_flag = state.auth.auth_flag;

  return {
    loader_flag,
    auth_flag
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoaderFlag(source) {
      dispatch(setLoaderFlag(source));
    },
    fetchUser(ucode) {
      dispatch(fetchUser(ucode));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
