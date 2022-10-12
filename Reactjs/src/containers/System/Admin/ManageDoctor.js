import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { LANGUAGE } from "../../../utils";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      desrciption: "",
      arrDoctor: [],
    };
  }

  componentDidMount() {
    this.props.FetchAllDoctor();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allDortorRedux !== this.props.allDortorRedux) {
      let dataDoctor = this.builDataInputSelect(this.props.allDortorRedux);
      this.setState({
        arrDoctor: dataDoctor,
      });
    }
  }
  builDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData &&
        inputData.map((item) => {
          let odject = {};
          let lableVi = `${item.lastName} ${item.firstName}`;
          let lableEn = `${item.firstName} ${item.lastName}`;

          odject.label = language === LANGUAGE.VI ? lableVi : lableEn;
          odject.value = item.id;
          result.push(odject);
        });
    }
  };
  handleSaveContentMarkdown = () => {
    console.log("markdoown", this.state);
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => this.state.selectedOption);
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleOnChangeDes = (event) => {
    this.setState({
      desrciption: event.target.value,
    });
  };
  render() {
    console.log("check state:", this.state);
    return (
      <div className="container manage-doctor">
        <div className="manage-doctor-title">Thong tin bac sy</div>
        <div className="manage-doctor-edit">
          <div className="content-left form-group">
            <label htmlFor="">Chon Ba sy</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.arrDoctor}
            />
          </div>
          <div className="content-right form-group">
            <label htmlFor="">Thong tin gioi thieu</label>
            <textarea
              value={this.state.desrciption}
              onChange={(event) => this.handleOnChangeDes(event)}
              class="form-control"
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>
        <div className=" markdown mb-5">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className="btn btn-success"
        >
          Luu Thong Tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDortorRedux: state.admin.allDortor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchAllDoctor: () => dispatch(actions.FetchAllDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
