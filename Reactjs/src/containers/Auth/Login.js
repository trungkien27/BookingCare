import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnchaneUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnchanePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login Sesscess");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    //jsx

    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Loign</div>
            <div className="col-12 form-grup login-input">
              <label htmlFor="">UserName:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Username"
                value={this.state.username}
                onChange={(event) => this.handleOnchaneUsername(event)}
              />
            </div>
            <div className="col-12 form-grup login-input">
              <label htmlFor="">PassWord:</label>
              <div className="custom-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnchanePassword(event)}
                />
                <span onClick={() => this.handleShowPassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 btn-login">
              <button
                className=""
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Log in
              </button>
            </div>
            <div className="col-12 forgot-pass">
              <span>Forgot your Password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span>Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
