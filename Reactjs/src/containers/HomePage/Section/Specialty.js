import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="tilte-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem Them</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-cutsmize">
                <div className="bg-image section-specialty" />
                <div>Co Xuong Khop 1</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-specialty"></div>
                <div>Co Xuong Khop 2</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-specialty"></div>
                <div>Co Xuong Khop 3</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-specialty"></div>
                <div>Co Xuong Khop 4</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-specialty"></div>
                <div>Co Xuong Khop 5</div>
              </div>
              <div className="section-cutsmize">
                <div className="bg-image section-specialty" />
                <div>Co Xuong Khop 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
