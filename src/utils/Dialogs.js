import React, {Component} from "react";
const $ = window.$;
class Dialogs extends Component {
  constructor(props) {
    super(props);
    this.closeAlert = this.closeAlert.bind(this);
  }
  closeAlert() {
    $("#alerthdr").text("");
    $("#alertdata").text("");
    $(".alertmodel").hide();
  }
  render() {
    return (
      <div>
        <div id="restchng" className="modal">
          <div className="modal-content animated fadeInDown">
            <span className="gen_spr close" />
            <div className="modalhead">Reset Changes</div>
            <div className="modalcontain">
              Are you sure you want to rest all changes?
            </div>
            <div className="modfoot wrapper">
              <span>
                <button
                  className="btn btn-primary open-modal"
                  data-modal="updatechng"
                >
                  Yes
                </button>
              </span>
              <span>
                <button className="btn btn-default">Cancel</button>
              </span>
            </div>
          </div>
        </div>

        <div id="alertusr" className="modal alertmodel">
          <div className="modal-content animated fadeInDown">
            <span className="gen_spr close" onClick={this.closeAlert} />
            <div className="modalhead" id="alerthdr" />
            <div className="modalcontain" id="alertdata" />
            <div align="center" className="modfoot wrapper">
              <span>
                <button
                  className="btn btn-primary open-modal width80"
                  onClick={this.closeAlert}
                >
                  OK
                </button>
              </span>
            </div>
          </div>
        </div>

        <div id="updatesucces" className="modal">
          <div className="modal-content animated fadeInDown">
            <span className="gen_spr close" />
            <div className="modalhead">Changes Updated</div>
            <div className="modalcontain">Changes updated successfully.</div>
            <div className="modfoot wrapper">
              <span>
                <button className="btn btn-primary fulwid">Ok</button>
              </span>
            </div>
          </div>
        </div>

        <div id="uploadInfo" className="modal">
          <div className="modal-content animated fadeInDown">
            <span className="gen_spr close" />
            <div className="modalhead">
              Upload Budget File<i className="sprite exclamation_ic" />
            </div>
            <div className="modalcontain">
              <p>
                *Use this feature if u wish to upload customize budget file
                containing list of categories-pincode combination and respective
                budget.
              </p>
              <p>*File should be in .XLS format.</p>
              <p>
                *File should contain following details : Category name; Pincode;
                Desired monthly budget.
              </p>
            </div>
            <div className="modfoot wrapper">
              <span>
                <button className="btn btn-primary fulwid">Ok</button>
              </span>
            </div>
          </div>
        </div>

        <div id="fileupsucces" className="modal">
          <div className="modal-content animated fadeInDown">
            <span className="gen_spr close" />
            <div className="modalhead">File uploaded</div>
            <div className="modalcontain">
              Your file has been uploaded successfully.
            </div>
            <div className="modfoot wrapper">
              <span>
                <button className="btn btn-primary fulwid">Ok</button>
              </span>
            </div>
          </div>
        </div>

        <div id="uploadInfo2" className="modal">
          <div className="modal-content animated fadeInDown">
            <span className="gen_spr close" />
            <div className="modalhead">
              Upload Budget File<i className="sprite exclamation_ic" />
            </div>
            <div className="modalcontain">
              <p>
                *Use this feature if u wish to upload customize budget for
                various Category-Pincode combination one at a time.
              </p>
            </div>
            <div className="modfoot wrapper">
              <span>
                <button className="btn btn-primary fulwid">Ok</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialogs;
