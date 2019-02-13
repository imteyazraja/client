import React, {Component} from "react";

import Spinner from "react-loader-spinner";

class Loader extends Component {
  render() {
    return (
      <div id="loading" style={{display: "block"}}>
        <div className="spinner">
          <Spinner type="Puff" color="#f50057" height="125" width="125" />
        </div>
      </div>
    );
  }
}
export default Loader;
