import React, { Component } from 'react';
import { Divider, ListItem } from 'material-ui';
import timeLength from 'time-length';
import dateFormat from 'dateformat';

class Booking extends Component {
  render() {
    let booking = this.props.booking;
    let start = new Date(booking.start);
    let end = new Date(booking.end);
    let startTime = dateFormat(start, "h:MM TT");
    let endTime = dateFormat(end, "h:MM TT");;
    let length = timeLength(end - start);

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
