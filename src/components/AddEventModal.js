import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class AddEventModal extends Component {
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

  updateState = (key, value, isEvent) => {
    if (isEvent) {
      value = value.target.value;
    }
    let stateUpdate = {};
    stateUpdate[key] = value;
    this.setState(stateUpdate, this.updateComplete);
  }

  updateComplete = () => {
    let state = this.state;
    let complete = Object.keys(state).filter(function(key) {
      return key !== "complete" && state[key] === "";
    }).length <= 0;
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
      <Dialog title="Add Event" open={this.props.show} modal={false} actions={actions} >
        <TextField  hintText="Event Name"
                    onChange={(event) => this.updateState('eventName', event, true)} />
        <TextField  hintText="Room Name"
                    onChange={(event) => this.updateState('roomName', event, true)} />
        <DatePicker hintText="Date"
                    onChange={(event, date) => this.updateState('date', date)} />
        <TimePicker hintText="Start Time"
                    onChange={(event, time) => this.updateState('startTime', time)} />
        <TimePicker hintText="End Time"
                    onChange={(event, time) => this.updateState('endTime', time)} />
      </Dialog>
    );
  }
}

export default AddEventModal;
