import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
// import MarkdownIt from "markdown-it";
// import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

// const mdParser = new MarkdownIt(/* Markdown-it options */);

// // Finish!
// function handleEditorChange({ html, text }) {
//   console.log("handleEditorChange", html, text);
// }

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.DeleteUserRedux(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUser(user);
  };
  render() {
    let arrUsers = this.state.userRedux;
    return (
      <>
        <div className="user-container">
          <div className="user-table mt-4 mb-5">
            <table id="customers">
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="manage-user.no" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.email" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.first-name" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.last-name" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.address" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.actions" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            onClick={() => this.handleEditUser(item)}
                            className="btn-edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => this.handleDeleteUser(item)}
                            className="btn-delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-5">
          {/* <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          /> */}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
