import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  const divStyle = {
    display: "block"
  };
  return ReactDOM.createPortal(
    <React.Fragment>
      <div
        className="modal fade cmnpop cmnnwpop reset in"
        style={divStyle}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title col-xs-12 visible-xs">
                <div
                  className="pull-right gen_spr rem_i"
                  data-dismiss="modal"
                  onClick={props.onDismiss}
                />
              </h4>
              <span className="col-xs-12 p0 subhd hidden-xs">
                {props.modal_data.header}
                <div
                  data-dismiss="modal"
                  className="pull-right gen_spr remicn_i mt10"
                  onClick={props.onDismiss}
                />
              </span>
            </div>
            <div className="modal-body">
              <div className="gnbx">
                <div className="col-xs-12 mb20 p0 font18">
                  {props.modal_data.message}
                </div>

                <div className="col-xs-12 p0 mt20 btnfix nwftrmob text-center">
                  <button
                    type="button"
                    className="btn btn-primary w100"
                    data-dismiss="modal"
                    onClick={props.onDismiss}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade in" />
    </React.Fragment>,
    document.querySelector("#dialog")
  );
};

export default Modal;
