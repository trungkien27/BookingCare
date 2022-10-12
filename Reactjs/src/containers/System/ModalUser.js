import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toggleModel();
  };

  handleOnchaneInut = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter :${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
      // this.setState({
      //   email: "",
      //   password: "",
      //   firstName: "",
      //   lastName: "",
      //   address: "",
      // });
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"model-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create New User
        </ModalHeader>
        <ModalBody>
          <div className="model-body">
            <div className="input-container">
              <label htmlFor="">Email</label>
              <input
                required={true}
                onChange={(event) => this.handleOnchaneInut(event, "email")}
                type="text"
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Passaword</label>
              <input
                onChange={(event) => this.handleOnchaneInut(event, "password")}
                type="password"
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(event) => this.handleOnchaneInut(event, "firstName")}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(event) => this.handleOnchaneInut(event, "lastName")}
              />
            </div>
            <div className="input-container max-w-input">
              <label htmlFor="">Address</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(event) => this.handleOnchaneInut(event, "address")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="primary"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add New
          </Button>
          <Button
            className="px-3"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
