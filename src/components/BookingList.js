import React, { Component } from 'react';
import { List, Divider, Subheader } from 'material-ui';
import Infinite from 'react-infinite';

import BookingDateList from './BookingDateList';
import { getDate, formatDate, getEmptyDays } from '../util/date-util.js';

class BookingList extends Component {
  render() {
    let bookingsByDate = this.getBookingsByDate(this.props.bookings)
    if (bookingsByDate.length <= 0) {
      bookingsByDate = (
        <div className="no-bookings">
          There are no scheduled bookings with the given parameters
        </div>
      );
    }
    //a bit hacky, should have a better way to handle this
    let height = this.props.isCalendarOpened
                      ? (window.innerHeight - 180) * 2 / 3
                      : window.innerHeight - 65;
    if (this.props.isSearching) height -= 48;
    return (
      <Infinite containerHeight={height} elementHeight={[1000]}>
        <List className="booking-list">
          <Subheader></Subheader> {/* Needed to prbooking top padding */}
          { bookingsByDate }
        </List>
      </Infinite>
    );
  }

  getBookingsByDate(bookings) {
    let bookingsByDate = [];
    bookings.forEach(function(booking) {
      let start = getDate(booking.start);
      if (!bookingsByDate[start]) {
        bookingsByDate[start] = {
          date: start,
          bookings: [],
        }
      }
      bookingsByDate[start].bookings.push(booking);
    });
    return Object.keys(bookingsByDate).map(function(date, i, keys) {
      let emptyDays = getEmptyDays(date, keys[i + 1]);
      let emptyDaysView = "";
      if (emptyDays) {
        emptyDaysView = (
          <div>
            <Divider />
            <Subheader className="date-header">
              {formatDate(emptyDays.start)} - {formatDate(emptyDays.end)}
            </Subheader>
            <div style={{padding:"1em"}}>
              You have no bookings for these dates
            </div>
            <Divider />
          </div>
        );
      }

      return (
        <div key={date} >
          <BookingDateList date={date} bookings={bookingsByDate[date].bookings} />
          { emptyDaysView }
        </div>
      );
    });
  }
}

export default BookingList;
