import React, { Component } from 'react';
import { Divider, Subheader } from 'material-ui';

import Booking from './Booking';
import { formatDate } from '../util/date-util.js';

class BookingDateList extends Component {
  render() {
    let date = parseInt(this.props.date, 10);
    let bookings = this.props.bookings.map(function(booking, i) {
      return (
        <Booking key={i} booking={booking} />
      )
    })
    
    return (
      <div>
        <DateHeader date={date}/>
        {bookings}
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

export default BookingDateList;
