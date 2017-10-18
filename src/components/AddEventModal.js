import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FontAwesome from 'react-fontawesome'
import SearchBar from 'material-ui-search-bar'
import dateFormat from 'dateformat';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class AddEventModal extends Component {
  constructor(props) {
    super(props);
    this.updateText = this.updateText.bind(this);
    this.state = {}
  }

  updateText(key, event, event2) {
    let stateUpdate = {};
    stateUpdate[key] = event.target.value;
    this.setState(stateUpdate);
  }

  updateDateTime(key, dateTime) {
    let stateUpdate = {};
    stateUpdate[key] = dateTime;
    this.setState(stateUpdate);
  }

  render() {
    let modal = this;
    // if (!this.props.show) {
    //   this.state = {};
    // }
    return (
      <Modal isOpen={this.props.show} >
        <form onSubmit={this.onAddEvent}>
          <TextField name="eventName" hintText="Event Name"
                     onChange={(event) => this.updateText('eventName', event)} />
          <TextField name="roomName" hintText="Room Name"
                     onChange={(event) => this.updateText('roomName', event)} />
          <DatePicker name="startDate" hintText="Start Date"
                     onChange={(event, date) => this.updateDateTime('startDate', date)} />
          <TimePicker name="startTime" hintText="Start Time"
                     onChange={(event, time) => this.updateDateTime('startTime', time)} />
          <DatePicker name="endDate" hintText="End Date"
                     onChange={(event, date) => this.updateDateTime('endDate', date)} />
          <TimePicker name="endTime" hintText="End Time"
                     onChange={(event, time) => this.updateDateTime('eventTime', time)} />
                   <RaisedButton onClick={() => this.props.onAddEvent(this.state)}>Submit</RaisedButton>
          <RaisedButton onClick={this.props.onAddEvent}>Close</RaisedButton>
        </form>
      </Modal>
    );
  }
}

export default AddEventModal;
