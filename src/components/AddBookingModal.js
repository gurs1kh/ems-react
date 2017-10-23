import React, { Component } from 'react';
import { Dialog, FlatButton, TextField, DatePicker, TimePicker } from 'material-ui';

class AddBookingModal extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.onClose= props.onClose;
    this.clearState();
  }

  clearState() {
    this.state = {
      complete: false,
      eventName: "",
      roomName: "",
      date: "",
      startTime: "",
      endTime: "",
    }
  }

  updateState = (key, value, isBooking) => {
    if (isBooking) {
      value = value.target.value;
    }
    let stateUpdate = {};
    stateUpdate[key] = value;
    this.setState(stateUpdate, this.updateComplete);
  }

  updateComplete = () => {
    let state = this.state;
    let complete = Object.keys(state).filter(function(key) {
      return key !== "complete" && key !== "roomName" && state[key] === "";
    }).length <= 0;
    complete = complete && this.state.startTime < this.state.endTime;
    this.setState({ complete : complete });
  }

  close = () => {
    this.clearState();
    this.onClose();
  }

  submit = () => {
    this.onSubmit(this.state);
    this.close();
  }

  render() {
    const actions = [
     <FlatButton label="Cancel" primary={true} onClick={this.close} />,
     <FlatButton label="Submit" primary={true} disabled={!this.state.complete} onClick={this.submit} />,
    ];

    return (
      <Dialog title="Add Booking" open={this.props.show} modal={false} actions={actions} >
        <TextField  hintText="Event Name"
                    onChange={(booking) => this.updateState('eventName', booking, true)} />
        <TextField  hintText="Room Name"
                    onChange={(booking) => this.updateState('roomName', booking, true)} />
        <DatePicker hintText="Date"
                    onChange={(booking, date) => this.updateState('date', date)} />
        <TimePicker hintText="Start Time"
                    onChange={(booking, time) => this.updateState('startTime', time)} />
        <TimePicker hintText="End Time"
                    onChange={(booking, time) => this.updateState('endTime', time)} />
      </Dialog>
    );
  }
}

export default AddBookingModal;
