import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ScrollableAnchor from 'react-scrollable-anchor';
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
      <ScrollableAnchor id={`time${date}`}>
        <div>
          <DateHeader date={date}/>
          {events}
        </div>
      </ScrollableAnchor>
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

function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let formattedDate = dateFormat(date, "ddd mmm dd").toUpperCase();
  if (sameDate(timeStamp, Date.now())) {
    formattedDate = "TODAY " + formattedDate;
  }
  return formattedDate;
}

function sameDate(timeStamp1, timeStamp2) {
  let date1 = new Date(timeStamp1).toDateString();
  let date2 = new Date(timeStamp2).toDateString();
  return date1 === date2;
}

export default ListForDate;
