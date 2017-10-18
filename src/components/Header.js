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

import AddEventModal from './AddEventModal.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleAddEvent = this.toggleAddEvent.bind(this);
    this.state = { searching: false, addingEvent: false };
  }

  toggleSearch() {
    this.setState({ searching: !this.state.searching });
  }

  toggleAddEvent({ eventName, roomName, startDate, startTime, endDate, endTime }) {
    if (eventName && roomName && startDate && startTime && endDate && endTime) {
      let start = parseDateTime(startDate, startTime);
      let end = parseDateTime(endDate, endTime);
      console.log({ eventName, roomName, start, end })

      this.props.onAddEvent({ eventName, roomName, start, end });
    }
    this.setState({ addingEvent: !this.state.addingEvent });
  }

  render() {
    let search = this.state.searching
        ? <SearchBar onChange={this.props.onMakeSearch}
                     onRequestSearch={this.props.onMakeSearch} />
        : "";
    let selectedMonth = dateFormat(this.props.selectedMonth, "mmmm yyyy");
    return (
      <div>
        <AppBar
          style={{ backgroundColor: "#F5F5F5" }}
          showMenuIconButton={false}
          title={
            <div className='header' onClick={this.props.onTitleClick}>
              <span>{selectedMonth}</span>
              <FontAwesome name="chevron-up" />
            </div>
          }
          iconElementRight={
            <div className="header action-icons">
              <div onClick={this.toggleSearch}><Icon name='search'/></div>
              <div onClick={this.toggleAddEvent}><Icon name='plus' /></div>
            </div>
          } />
        {search}
        <AddEventModal show={this.state.addingEvent}
                       onAddEvent={this.toggleAddEvent} />
      </div>
    );
  }
}

const Icon = (props) => (
  <FontAwesome name={props.name} size={props.size || '2x'} />
)

function parseDateTime(date, time) {
  return new Date(date).toDateString() + new Date(time).toTimeString();
}

export default Header;
