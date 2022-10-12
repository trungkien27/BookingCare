import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/Logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
class HomeHeader extends Component {
  OnClickLanguage = (language) => {
    this.props.changeLanguageApp(language);
    // alert(language);
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo">
                <img src={logo} alt={logo} />
              </div>
            </div>
            <div className="center-content">
              <div className="child-center">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="title-sub">
                  <FormattedMessage id="homeheader.searchdocter" />
                </div>
              </div>
              <div className="child-center">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facilities" />
                  </b>
                </div>
                <div className="title-sub">
                  <FormattedMessage id="homeheader.select-zoom" />
                </div>
              </div>
              <div className="child-center">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.docter" />
                  </b>
                </div>
                <div className="title-sub">
                  <FormattedMessage id="homeheader.select-docter" />
                </div>
              </div>
              <div className="child-center">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="title-sub">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGE.VI ? "flag-vn active" : "flag-vn"
                }
              >
                <span onClick={() => this.OnClickLanguage(LANGUAGE.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGE.EN ? "flag-en active" : "flag-vn"
                }
              >
                <span onClick={() => this.OnClickLanguage(LANGUAGE.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-banner">
          <div className="content-up">
            <div className="title-1">
              <FormattedMessage id="banner.title1" />
            </div>
            <div className="title-2">
              <FormattedMessage id="banner.title2" />
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="tim kiem" />
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text">
                  <FormattedMessage id="banner.optins1" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text">
                  <FormattedMessage id="banner.optins2" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-procedures"></i>
                </div>
                <div className="text">
                  <FormattedMessage id="banner.optins3" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-flask"></i>
                </div>
                <div className="text">
                  <FormattedMessage id="banner.optins4" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="text">
                  <FormattedMessage id="banner.optins5" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-syringe"></i>
                </div>
                <div className="text">
                  <FormattedMessage id="banner.optins5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
