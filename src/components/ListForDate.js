import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import dateFormat from 'dateformat';

import Event from './Event';

class ListForDate extends Component {
  render() {
    let date = parseInt(this.props.date, 10);
    let events = this.props.events.map(function(event, i) {
      return (
        <Event key={i} event={event} />
      )
    })
    return (
      <div>
        <DateHeader date={date}/>
        {events}
      </div>
    );
  }
}

const DateHeader = (props) => (
  <div>
    <Divider />
    <Subheader className="date-header">{formatDate(props.date)}</Subheader>
    <Divider />
  </div>
)

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let format = "ddd mmm dd";
  if (date.getFullYear() !== new Date().getFullYear()) {
    format += ' yyyy';
  }
  let formattedDate = dateFormat(date, format).toUpperCase();
  if (sameDate(timestamp, Date.now())) {
    formattedDate = "TODAY " + formattedDate;
  }
  return formattedDate;
}

function sameDate(timestamp1, timestamp2) {
  let date1 = new Date(timestamp1).toDateString();
  let date2 = new Date(timestamp2).toDateString();
  return date1 === date2;
}

export default ListForDate;
