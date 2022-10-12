import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: "",
    };
  }
  handleOnClick = () => {
    this.setState({ student: document.querySelector("input").value });

    toast("assdasd");
    // return user;
  };
  // handleOnChange = (event) => {
  //   this.setState({
  //     stu: event.target.value,
  //   });
  // };
  render() {
    let arrUsers = this.state.userRedux;
    let { student } = this.state;
    return (
      <div className="user-container">
        {student}
        <div className="user-table mt-4 mb-5">
          <input
            // value={this.state.stu}
            // onChange={(event) => this.handleOnChange(event)}
            type="text"
          />
          <button onClick={() => this.handleOnClick()}>dad</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteUserRedux: (id) => dispatch(actions.DeleteUser(id)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
