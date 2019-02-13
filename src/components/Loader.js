import React, {Component} from "react";

class Loader extends Component {
  render() {
    return (
      <div id="loading" style={{display: "block"}}>
        <div className="loader" />
      </div>
    );
  }
}
export default Loader;
