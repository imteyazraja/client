/* eslint-disable */
import React, {Component} from "react";
import Dropzone from "react-dropzone";
import {connect} from "react-redux";
import {setLoaderFlag, uploadData, fetchH2LBudgetData} from "../actions";
import Loader from "./Loader";
import Error from "./Error";
import MyAutosuggest from "../utils/MyAutosuggest";
import Dialogs from "../utils/Dialogs";
import helper from "../utils/helper";

import _ from "lodash";

const $ = window.$;
const h2lInitalState = {
  h2lSubtab: "grid",
  filePreview: [],
  browsedFile: "",
  filesContent: [],
  catpinetierbdgt: [],
  catpincodebdgt: [],
  h2lTab1Errors: "",
  h2lTab2Errors: "",
  tab1ErrorCls: "",
  tab2ErrorCls: "",
  catpinpgno: 1
};

class HighestToLowest extends Component {
  constructor(props) {
    super(props);

    this.state = h2lInitalState;

    this.onDrop = this.onDrop.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!helper.isEmpty(nextProps.uploadinfo)) {
      console.log("nextProps" + JSON.stringify(nextProps.uploadinfo));
    }
    let catpinetierbdgt_1,
      h2lTab1Errors_1,
      tab1ErrorCls_1,
      catpincodebdgt_1,
      h2lTab2Errors_1,
      tab2ErrorCls_1; //temp variables
    if (!helper.isEmpty(nextProps.catpintier_data)) {
      if (nextProps.catpintier_data.errorcode === 0) {
        catpinetierbdgt_1 = nextProps.catpintier_data.results;
        h2lTab1Errors_1 = "";
        tab1ErrorCls_1 = "";
      } else if (nextProps.catpintier_data.errorcode === 1) {
        var errcity = nextProps.catpintier_cityauto;
        catpinetierbdgt_1 = []; // temp basis
        h2lTab1Errors_1 =
          "No category pincode tierwise data found in " + errcity + " city.";
        tab1ErrorCls_1 = "";
      }
    } else if (helper.isEmpty(nextProps.catpintier_data)) {
      catpinetierbdgt_1 = [];
      h2lTab1Errors_1 = "Please select city from autosuggest tab1.";
      tab1ErrorCls_1 = "displayMsg";
    }
    if (!helper.isEmpty(nextProps.catpinbdgt_data)) {
      if (nextProps.catpinbdgt_data.errorcode === 0) {
        catpincodebdgt_1 = nextProps.catpinbdgt_data;
        h2lTab2Errors_1 = "";
        tab2ErrorCls_1 = "";
      } else if (nextProps.catpinbdgt_data.errorcode === 1) {
        var errcity = nextProps.catpintier_cityauto;
        catpincodebdgt_1 = nextProps.catpinbdgt_data; // temp basis
        h2lTab2Errors_1 =
          "No category pincode budget found in " + errcity + " city.";
        tab2ErrorCls_1 = "";
      }
    } else if (helper.isEmpty(nextProps.catpinbdgt_data)) {
      catpincodebdgt_1 = [];
      h2lTab2Errors_1 = "Please select city from autosuggest tab2.";
      tab2ErrorCls_1 = "displayMsg";
    }
    return {
      catpinetierbdgt: catpinetierbdgt_1,
      h2lTab1Errors: h2lTab1Errors_1,
      tab1ErrorCls: tab1ErrorCls_1,
      catpincodebdgt: catpincodebdgt_1,
      h2lTab2Errors: h2lTab2Errors_1,
      tab2ErrorCls: tab2ErrorCls_1
    };
  }
  componentWillUnmount() {
    //alert("called"); not working
    this.setState(h2lInitalState);
  }
  setH2LSubTab(subtab) {
    this.setState({h2lSubtab: subtab});
  }
  showMoreCatPinBudget() {
    this.props.setLoaderFlag("h2l");
    var page_no = this.props.catpinpgno + 1;
    this.props.fetchH2LBudgetData(
      this.props.catpinbdgt_cityauto,
      "h2lctcatpin",
      page_no
    );
  }
  submitCatPinTierBudget() {
    let temp_catpin_arr = [];
    for (let i = 0; i <= 4; i++) {
      temp_catpin_arr[i] = [];
      for (let j = 0; j <= 4; j++) {
        let ref = "pincat_tierbdgt_" + i + "_" + j;
        if (parseInt(this.refs[ref].value) > 0) {
          temp_catpin_arr[i][j] = parseInt(this.refs[ref].value);
        } else {
          this.openAlert("Error !!!", "Please enter valid budget.");
          return false;
        }
      }
    }

    console.log("value", JSON.stringify(temp_catpin_arr));
  }
  onDrop(files) {
    let thisObj = this;
    if (parseInt(Object.keys(files).length) > 0) {
      for (var keyImg in files) {
        if (files.hasOwnProperty(keyImg) && files[keyImg] instanceof File) {
          thisObj.setState({filesContent: files[0]});
          let file = files[keyImg];
          var filename = file["name"];
          var filetype = file["type"];

          thisObj.setState({browsedFile: filename});

          let reader = new FileReader();
          reader.onload = function(e) {
            var newVals = {};
            newVals = helper.assign(thisObj.state);
            newVals["filePreview"].push(e.target.result);
            thisObj.setState({newVals});
          };
          reader.readAsDataURL(file);
        }
      }
    } else {
      this.openAlert("Error !!!", "Please upload excel file.");
      return false;
    }
  }

  removePhoto() {}
  uploadPhoto() {
    if (!helper.isEmpty(this.state.filesContent)) {
      var formData = new FormData();
      formData.append("file", this.state.filesContent);

      this.props.setLoaderFlag("h2l");
      //this.props.uploadData(formData);
      //console.log("result" + this.props.uploadinfo); // can't do it here - can be done using getDerivedStateFromProps
    } else {
      this.openAlert("Error !!!", "Please select file to upload.");
      return false;
    }
  }

  openAlert(header, content) {
    $("#alerthdr").text(header);
    $("#alertdata").text(content);
    $("#alertusr").show();
  }
  render() {
    const {
      catpintier_cityauto,
      catpinbdgt_cityauto,
      catpinbdgt_catauto,
      catpinbdgt_pinauto
    } = this.props;
    var previewData = this.state.filePreview;
    var browsedFile = this.state.browsedFile;
    return (
      <div id="ChildVerticalTab_1">
        {this.props.loader_flag ? <Loader /> : null}
        <ul className="inter-headlist resp-tabs-list hor_2">
          <li
            className={this.state.h2lSubtab === "grid" ? "active" : "notactive"}
            onClick={this.setH2LSubTab.bind(this, "grid")}
          >
            Customise by Grid
          </li>
          <li
            className={
              this.state.h2lSubtab === "catpin" ? "active" : "notactive"
            }
            onClick={this.setH2LSubTab.bind(this, "catpin")}
          >
            Customise by Category - Pincode
          </li>
        </ul>

        <div className="resp-tabs-container hor_2">
          <Dialogs />
          {this.state.h2lSubtab === "grid" && (
            <div>
              <div className="slctpos mb10">
                <div className="city_wrp">
                  <label className="w100">Change City</label>
                  <MyAutosuggest
                    id="h2lctgrid"
                    placeholder=""
                    value={this.props.catpintier_cityauto}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              {!helper.isEmpty(this.state.catpinetierbdgt) && (
                <div className="slctpos">
                  <div className="conterDiv">
                    <div className="tableDiv">
                      <div className="titHead">
                        Current Grid for {this.props.value}
                        <div className="edtGrid">
                          <a href="" className="">
                            Edit Budget <i className="gen_spr edt-icon" />
                          </a>
                        </div>
                      </div>
                      <div className="tableView">
                        <div className="headrow">
                          <div className="rowDiv">&nbsp;</div>
                          <div className="rowDiv">Pincode Tier1</div>
                          <div className="rowDiv">Pincode Tier2</div>
                          <div className="rowDiv">Pincode Tier3</div>
                          <div className="rowDiv">Pincode Tier4</div>
                          <div className="rowDiv">Pincode Tier5</div>
                        </div>
                        <div className="rgtside">
                          <table width="100%" cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <th className="colmDiv">Keyword Tier1</th>
                                <th className="colmDiv">Keyword Tier2</th>
                                <th className="colmDiv">Keyword Tier3</th>
                                <th className="colmDiv">Keyword Tier4</th>
                                <th className="colmDiv">Keyword Tier5</th>
                              </tr>
                              {_.values(this.state.catpinetierbdgt).map(
                                (budgetdata, tridx) => {
                                  return (
                                    <tr key={tridx}>
                                      {_.values(budgetdata).map(
                                        (data, tdidx) => {
                                          return (
                                            <td key={tdidx} className="colmDiv">
                                              <input
                                                ref={
                                                  "pincat_tierbdgt_" +
                                                  tridx +
                                                  "_" +
                                                  tdidx
                                                }
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                defaultValue={data.bdgt}
                                                pattern="[0-9]"
                                                min="1"
                                              />
                                              <i className="gen_spr rup-icon" />
                                            </td>
                                          );
                                        }
                                      )}
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ftrbtn btncel">
                    <button
                      className="btn btn-primary"
                      onClick={this.submitCatPinTierBudget.bind(this)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
              {!helper.isEmpty(this.state.h2lTab1Errors) ? (
                <Error
                  errmsg={this.state.h2lTab1Errors}
                  applyCls={this.state.tab1ErrorCls}
                />
              ) : null}
            </div>
          )}
          {this.state.h2lSubtab === "catpin" && (
            <div>
              <div className="slctpos mb10">
                <div className="city_wrp">
                  <label className="w100">Change City</label>
                  <MyAutosuggest
                    id="h2lctcatpin"
                    placeholder=""
                    value={this.props.catpinbdgt_cityauto}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              {!helper.isEmpty(this.state.catpincodebdgt) && (
                <div className="slctpos mb10">
                  <div className="conterDiv">
                    <div className="heading">
                      Upload Budget File
                      <i
                        className="gen_spr info open-modal"
                        data-modal="uploadInfo"
                      />
                    </div>
                    <div className="custom_file_upload">
                      {/* {previewData.length != 0 && (
                      <span className="pic">
                        <img
                          className="image-container"
                          src={previewData[0]}
                          alt=""
                          title=""
                        />
                        <a
                          className="gen_spr rem_i"
                          onClick={() => this.removePhoto(0)}
                          href="javascript:void(0)"
                        />
                      </span>
                    )} */}
                      <input
                        type="text"
                        className="file"
                        value={this.state.browsedFile}
                      />
                      {browsedFile !== "" && (
                        <span className="pic">
                          <a
                            className="gen_spr rem_i"
                            onClick={() => this.removePhoto(0)}
                            href="javascript:void(0)"
                          />
                        </span>
                      )}

                      <div className="file_upload">
                        <Dropzone
                          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          //accept="image/jpeg, image/png"
                          onDrop={this.onDrop.bind(this)}
                          className="dropZoneStyle"
                        >
                          Browse File
                          {/* <input type="file" id="file_upload" name="file_upload" /> */}
                        </Dropzone>
                      </div>
                    </div>
                    <div className="wrapper txt-center">
                      <button
                        type="submit"
                        className="upload_btn open-modal"
                        data-modal="fileupsucces"
                        onClick={this.uploadPhoto.bind(this)}
                      >
                        Upload File
                      </button>
                    </div>

                    <div className="wrapper orDiv">
                      <span className="ortxt">OR</span>
                    </div>

                    <div className="heading">
                      Update by Category Pincode
                      <i
                        className="gen_spr info open-modal"
                        data-modal="uploadInfo2"
                      />
                    </div>

                    <div className="cat_wrpr">
                      <div className="selbycat mmt-10">
                        <MyAutosuggest
                          id="h2lcatauto"
                          placeholder="Select Category"
                          value={this.props.catpinbdgt_catauto}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="selbycat">
                        <MyAutosuggest
                          id="h2lpinauto"
                          placeholder="Select Pincode"
                          value={this.props.catpinbdgt_pinauto}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="selbycat">
                        <i className="gen_spr brup-icon" />
                        <input
                          className="pl17 inrfrm"
                          type="text"
                          value=""
                          placeholder=""
                        />
                        <label className="pl17">Enter New Budget</label>
                      </div>
                    </div>

                    <div className="wrapper txt-center mb20">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                    {this.state.catpincodebdgt.errorcode === 0 && (
                      <div className="conterDiv mt20">
                        <div className="tableDiv">
                          <div className="titHead">
                            Select Category-Pincode Combinations
                          </div>
                          <div className="delGrid">
                            <a href="" className="">
                              <i className="gen_spr del-icon" /> Delete
                            </a>
                          </div>
                          <div className="tableView">
                            <table
                              width="100%"
                              cellPadding="0"
                              cellSpacing="0"
                              border="1"
                              className="combiTable"
                            >
                              <tbody>
                                <tr>
                                  <th />
                                  <th>Category</th>
                                  <th>Pincode</th>
                                  <th>Minimum Monthly Budget</th>
                                </tr>

                                {_.values(this.state.catpincodebdgt.data).map(
                                  (value, key) => {
                                    return (
                                      <tr key={key}>
                                        <td>
                                          <label>
                                            <input
                                              type="checkbox"
                                              className="chkinpt"
                                            />
                                            <span className="gen_spr rdio_i" />
                                            <span className="txt" />
                                          </label>
                                        </td>
                                        <td>{value.catname}</td>
                                        <td>{value.pincode}</td>
                                        <td>
                                          <i className="gen_spr rup-icon" />
                                          {value.budget}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {this.state.catpincodebdgt.hasmore == 1 && (
                          <div className="wrapper txt-center mt20">
                            <button
                              className="btn btn-default"
                              onClick={this.showMoreCatPinBudget.bind(this)}
                            >
                              View More
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {!helper.isEmpty(this.state.h2lTab2Errors) ? (
                <Error
                  errmsg={this.state.h2lTab2Errors}
                  applyCls={this.state.tab2ErrorCls}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const suggestions = state.autodata.suggestions;
  const catpintier_cityauto = state.autodata.catpintier_cityauto;
  const catpinbdgt_cityauto = state.autodata.catpinbdgt_cityauto;
  const catpinbdgt_catauto = state.autodata.catpinbdgt_catauto;
  const catpinbdgt_pinauto = state.autodata.catpinbdgt_pinauto;
  const uploadinfo = state.commondata.uploadinfo;
  const loader_flag = state.h2ldata.loader_flag;
  const catpintier_data = state.h2ldata.catpintier_data;
  const catpinbdgt_data = state.h2ldata.catpinbdgt_data;
  const catpinpgno = state.h2ldata.catpinpgno;
  return {
    suggestions,
    catpintier_cityauto,
    catpinbdgt_cityauto,
    catpinbdgt_catauto,
    catpinbdgt_pinauto,
    uploadinfo,
    loader_flag,
    catpintier_data,
    catpinbdgt_data,
    catpinpgno
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoaderFlag(source) {
      dispatch(setLoaderFlag(source));
    },
    uploadData(formData) {
      dispatch(uploadData(formData));
    },
    fetchH2LBudgetData(data_city, id, pgno) {
      dispatch(fetchH2LBudgetData(data_city, id, pgno));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HighestToLowest);
