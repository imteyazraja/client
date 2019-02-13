import React, {Component} from "react";
import {connect} from "react-redux";
import Autosuggest from "react-autosuggest";
import {fetchH2LBudgetData} from "../actions";
import Modal from "./Modal";
import {isEmpty} from "./helper";

import {
  updateInputValue,
  clearSuggestions,
  maybeUpdateSuggestions,
  toggleError
} from "../actions";

var delayTimer;
function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>;
}

function loadSuggestions(id, value) {
  return dispatch => {
    //dispatch(loadSuggestionsBegin());
    clearTimeout(delayTimer);
    // Fake an AJAX call
    delayTimer = setTimeout(() => {
      //dispatch(maybeUpdateSuggestions(getMatchingLanguages(value), value));
      dispatch(maybeUpdateSuggestions(id, value));
    }, 1000);
  };
}

class MyAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.sendData = {};
    this.state = {
      id: ""
    };
  }
  onSuggestionSelected(
    event,
    {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}
  ) {
    if (this.props.id === "pkgempauto") {
      let pkg_empname = suggestionValue
        .substr(0, suggestionValue.indexOf(" ("))
        .trim();

      let pkg_empcode = suggestionValue.substring(
        suggestionValue.indexOf("(") + 1
      );
      pkg_empcode = pkg_empcode.replace(")", "").trim();

      this.sendData.id = "pkgempauto";
      this.sendData.val = {};
      this.sendData.val.newValue = pkg_empname;
      this.sendData.val.empcode = pkg_empcode;
      this.props.onChange(this.sendData);
    }
    if (this.props.id === "h2lctgrid" || this.props.id === "h2lctcatpin") {
      this.props.fetchH2LBudgetData(suggestionValue, this.props.id, 1); // page no 3rd param
    }
  }
  onChange(event, {newValue}) {
    this.sendData.id = this.props.id;
    this.sendData.val = {newValue};
    this.props.onChange(this.sendData);
    //this.props.onKeyPress(event);
  }

  onBlur(event, {highlightedSuggestion}) {
    if (this.props.id === "pkgempauto") {
      if (isEmpty(this.props.pkg_empcode)) {
        let err_obj = {};
        err_obj["camp"] = "Package";
        err_obj["show"] = 1;
        err_obj["header"] = "ERROR !!!";
        err_obj["message"] = "Please select user from autosuggest.";
        this.props.toggleError(err_obj);
      }
    }
  }

  hideModal = () => {
    if (isEmpty(this.props.pkg_empcode)) {
      this.sendData.id = "pkgempauto";
      this.sendData.val = {};
      this.sendData.val.newValue = "";
      this.sendData.val.empcode = "";
      this.props.onChange(this.sendData);
    }
    let err_obj = {};
    err_obj["show"] = 0;
    this.props.toggleError(err_obj);
  };

  render() {
    const {
      placeholder,
      id,
      value,
      suggestions,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested
    } = this.props;
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    return (
      <React.Fragment>
        {this.props.error_flag ? (
          <Modal
            onDismiss={this.hideModal}
            modal_data={this.props.error_data}
          />
        ) : null}
        <Autosuggest
          id={id}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const suggestions = state.autodata.suggestions;
  const catpintier_cityauto = state.autodata.catpintier_cityauto;
  const catpinbdgt_cityauto = state.autodata.catpinbdgt_cityauto;
  const pkg_empcode = state.autodata.pkg_empcode;
  const isLoading = state.autodata.isLoading;
  const error_flag = state.pkgdata.error_flag;
  const error_data = state.pkgdata.error_data;

  return {
    suggestions,
    catpintier_cityauto,
    catpinbdgt_cityauto,
    isLoading,
    pkg_empcode,
    error_flag,
    error_data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange(newValue) {
      dispatch(updateInputValue(newValue));
    },
    onSuggestionsFetchRequested({id, value}) {
      dispatch(loadSuggestions(id, value));
    },
    onSuggestionsClearRequested() {
      dispatch(clearSuggestions());
    },
    fetchH2LBudgetData(selval, id, pgno) {
      dispatch(fetchH2LBudgetData(selval, id, pgno));
    },
    toggleError(errinfo) {
      dispatch(toggleError(errinfo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAutocomplete);
