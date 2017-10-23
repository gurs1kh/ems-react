import React, { Component } from 'react';
import { Divider, ListItem } from 'material-ui';
import timeLength from 'time-length';

import { formatTime } from '../util/date-util.js';

class Booking extends Component {
  render() {
    let booking = this.props.booking;
    let start = new Date(booking.start).getTime();
    let end = new Date(booking.end).getTime();
    let startTime = formatTime(start);
    let endTime = formatTime(end);
    let length = (end - start >= 0) ? timeLength(end - start) : 0;
    return (
      <div>
        <ListItem className='list-item list'>
          <div className="booking-item booking-time">
            <div>{startTime}</div>
            <div>{endTime}</div>
            <div>{length}</div>
          </div>
          <div className="booking-item booking-title">
            <div>{booking.eventName}</div>
            <div>{booking.roomName}</div>
          </div>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export default Booking;
