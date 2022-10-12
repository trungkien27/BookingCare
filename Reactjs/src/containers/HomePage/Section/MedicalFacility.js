import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="tilte-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem Them</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-cutsmize">
                <div className="bg-image section-medical-facility" />
                <div>Bệnh viện Hữu nghị Việt Đức1</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-medical-facility"></div>
                <div>Bệnh viện Hữu nghị Việt Đức2</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-medical-facility"></div>
                <div>Bệnh viện Hữu nghị Việt Đức3</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-medical-facility"></div>
                <div>Bệnh viện Hữu nghị Việt Đức 4</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-medical-facility"></div>
                <div>Bệnh viện Hữu nghị Việt Đức5</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-medical-facility" />
                <div>Bệnh viện Hữu nghị Việt Đức 6</div>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
