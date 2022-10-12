import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUser,
  createNewUserService,
  deleteUserSevice,
  updateUserSevice,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      userEdit: [],
      isOpenModel: false,
      isOpenModelEdit: false,
    };
  }
  /**
   * life cycle
   * 1. Run construct => init state
   * 2.Did mount(set State)
   * 3.Render
   *
   */
  async componentDidMount() {
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    let res = await getAllUser("ALL");
    if (res && res.errCode === 0) {
      console.log(res);
      this.setState({
        arrUser: res.user,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModel: true,
    });
  };

  toggleModel = () => {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  };
  toggleEditUserModel = () => {
    this.setState({
      isOpenModelEdit: !this.state.isOpenModelEdit,
    });
  };

  createNewUser = async (data) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUsers();
        this.setState({
          isOpenModel: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = (user) => {
    this.setState({
      isOpenModelEdit: true,
      userEdit: user,
    });
  };
  updateUser = async (user) => {
    try {
      console.log("click", user);
      let res = await updateUserSevice(user);
      if (res && res.errCode === 0) {
        await this.getAllUsers();
        this.setState({
          isOpenModelEdit: false,
        });
      } else {
        alert(res.errMessage);
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  handleDeleteUser = async (id) => {
    try {
      let res = await deleteUserSevice(id);
      if (res && res.errCode === 0) {
        await this.getAllUsers();
      } else {
        alert(res.errMessage);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModel}
          toggleModel={this.toggleModel}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModelEdit && (
          <ModalEditUser
            isOpen={this.state.isOpenModelEdit}
            toggleModel={this.toggleEditUserModel}
            currentEdit={this.state.userEdit}
            updateUser={this.updateUser}
          />
        )}
        <div className="title text-center">Trung Kien</div>
        <div className="user-table mt-4 mx-4">
          <div className="mx-1">
            <button
              onClick={() => this.handleAddNewUser()}
              className="btn btn-success px-3"
            >
              <i className="fas fa-plus"></i>Add New
            </button>
          </div>
          <table id="customers">
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Fisrt Name</th>
                <th>Last Name</th>
                <th>Addresss</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUser &&
                arrUser.length > 0 &&
                arrUser.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-detail">
                          <i className="fas fa-info-circle"></i>
                        </button>
                        <button
                          onClick={() => this.handleEditUser(item)}
                          className="btn-edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => this.handleDeleteUser(item.id)}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
