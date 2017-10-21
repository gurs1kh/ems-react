import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List';
import dateFormat from 'dateformat';
import timeLength from 'time-length';

class Event extends Component {
  render() {
    let event = this.props.event;
    let start = new Date(event.start).getTime();
    let end = new Date(event.end).getTime();
    let startTime = formatTime(start);
    let endTime = formatTime(end);
    let length = (end - start >= 0) ? timeLength(end - start) : 0;
    return (
      <div>
        <ListItem className='list-item list'>
          <div className="event-item event-time">
            <div>{startTime}</div>
            <div>{endTime}</div>
            <div>{length}</div>
          </div>
          <div className="event-item event-title">
            <div>{event.eventName}</div>
            <div>{event.roomName}</div>
          </div>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  return dateFormat(date, "h:MM TT");
}

export default Event;
