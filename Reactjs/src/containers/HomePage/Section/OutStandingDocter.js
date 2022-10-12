import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGE } from "../../../utils/constant";
import * as actions from "../../../store/actions";

class OutStandingDocter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctor !== this.props.topDoctor) {
      this.setState({
        arrDoctor: this.props.topDoctor,
      });
    }
  }
  render() {
    // console.log("check props", this.props);
    let arrDoctor = this.state.arrDoctor;
    let { language } = this.props;
    // arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor);
    return (
      <div className="section-share section-outstanding-docter">
        <div className="section-container">
          <div className="section-header">
            <span className="tilte-section">
              <FormattedMessage id="homepage.outstanding-docter" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctor &&
                arrDoctor.length > 0 &&
                arrDoctor.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div className="section-cutsmize" key={item.id}>
                      <div className="cutsmize-boder">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-docter"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>
                            {LANGUAGE.VI === language ? nameVi : nameEn}
                          </div>
                          <div>Tai Mũi Họng1</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctor: state.admin.topDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.FetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDocter);
