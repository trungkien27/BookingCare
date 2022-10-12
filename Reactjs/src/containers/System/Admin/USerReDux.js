import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGE, CRUD_Actions, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./userRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableUser from "./TableUser";
import { toast } from "react-toastify";

class USerReDux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImg: "",
      isOpenImg: false,
      action: "",
      activeImg: false,

      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "",
      position: "",
      role: "",
      avata: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender[0].keyMap,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position: arrPosition[0].keyMap,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole[0].keyMap,
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGender = this.props.genderRedux;
      let arrRole = this.props.roleRedux;
      let arrPosition = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avata: "",
        previewImg: "",
        action: CRUD_Actions.CREATE,
      });
    }
  }
  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        avata: base64,
        activeImg: true,
      });
    }
  };
  handleOnClickImg = () => {
    if (!this.state.previewImg) return;
    this.setState({
      isOpenImg: true,
    });
  };
  checkValidateInput = () => {
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        toast.error(`Missing Input required: ${arrCheck[i]}`);
        break;
      }
    }
    return isValid;
  };
  handleOnClickSave = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_Actions.CREATE) {
      //file redux action
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        phonenumber: this.state.phonenumber,
        positionId: this.state.position,
        avata: this.state.avata,
      });
      this.setState({
        activeImg: false,
      });
    }
    if (action === CRUD_Actions.EDIT) {
      //file redux edit user
      this.props.EditUserRedux({
        id: this.state.id,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        phonenumber: this.state.phonenumber,
        positionId: this.state.position,
        avata: this.state.avata,
      });
      this.setState({
        activeImg: false,
      });
    }

    this.props.fetchUserRedux();
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditUser = (user) => {
    let imageBase64 = "";
    if (user.image) {
      // const imageBuffer = Buffer.from(JSON.stringify(user.image));
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    this.setState({
      id: user.id,
      email: user.email,
      password: "kocodaumaxem",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phonenumber: user.phonenumber,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avata: "",
      previewImg: imageBase64,
      action: CRUD_Actions.EDIT,
    });
    if (!user.image) {
      this.setState({
        activeImg: false,
      });
    }
    if (user.image) {
      this.setState({
        activeImg: true,
      });
    }
    console.log("stae", this.state);
  };
  render() {
    let genders = this.state.genderArr;
    let isLoadingGender = this.props.isLoadingGender;
    let rolles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phonenumber,
      gender,
      position,
      role,
      avata,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux Trung Kien</div>;
        <div>{isLoadingGender === true ? "Loading Gender" : ""}</div>
        <div className="user-redux-body">
          <div className="container">
            <h3 className="my-3">
              <FormattedMessage id="manage-user.add" />
            </h3>
            <div className="row">
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.email" />:
                </label>
                <input
                  disabled={
                    this.state.action === CRUD_Actions.EDIT ? true : false
                  }
                  onChange={(event) => this.onChangeInput(event, "email")}
                  value={email}
                  className="form-control"
                  type="email"
                />
              </div>
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.password" />:
                </label>
                <input
                  disabled={
                    this.state.action === CRUD_Actions.EDIT ? true : false
                  }
                  onChange={(event) => this.onChangeInput(event, "password")}
                  value={password}
                  className="form-control"
                  type="password"
                />
              </div>
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.first-name" />:
                </label>
                <input
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                  value={firstName}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.last-name" />:
                </label>
                <input
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                  value={lastName}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.phone" />:
                </label>
                <input
                  onChange={(event) => this.onChangeInput(event, "phonenumber")}
                  value={phonenumber}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-9 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.address" />:
                </label>
                <input
                  onChange={(event) => this.onChangeInput(event, "address")}
                  value={address}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.gender" />:
                </label>
                <select
                  value={gender}
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "gender")}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option value={item.keyMap} key={index}>
                          {LANGUAGE.VI === language
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.position" />:
                </label>
                <select
                  value={position}
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "position")}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option value={item.keyMap} key={index}>
                          {LANGUAGE.VI === language
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.role" />:
                </label>
                <select
                  value={role}
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "role")}
                >
                  {rolles &&
                    rolles.length > 0 &&
                    rolles.map((item, index) => {
                      return (
                        <option value={item.keyMap} key={index}>
                          {LANGUAGE.VI === language
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.avata" />:
                </label>
                <div className="preview-img-container">
                  <input
                    type="file"
                    id="previewImg"
                    hidden
                    onChange={(event) => this.handleOnChangeImg(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    <FormattedMessage id="manage-user.upload" />{" "}
                    <i className="fas fa-upload"></i>
                  </label>
                  <div
                    // style={{backgroundImage: `url${this.state.previewImg}`}}
                    onClick={() => this.handleOnClickImg()}
                    className={
                      this.state.activeImg === true
                        ? "preview-img active"
                        : "preview-img"
                    }
                  >
                    <FormattedMessage id="manage-user.showimage" />
                  </div>
                </div>
              </div>
            </div>
            <button
              className={
                this.state.action === CRUD_Actions.EDIT
                  ? "btn btn-warning mt-3"
                  : "btn btn-primary mt-3"
              }
              onClick={() => this.handleOnClickSave()}
              type="Submit"
            >
              {this.state.action === CRUD_Actions.EDIT ? (
                <FormattedMessage id="manage-user.edit" />
              ) : (
                <FormattedMessage id="manage-user.save" />
              )}
            </button>
            <TableUser
              action={this.state.action}
              handleEditUser={this.handleEditUser}
            />
          </div>
        </div>
        {this.state.isOpenImg === true && (
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isOpenImg: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    EditUserRedux: (data) => dispatch(actions.EditUser(data)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPsoitionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(USerReDux);
