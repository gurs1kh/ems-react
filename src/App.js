import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import { Header, Calendar, BookingList, AddBookingModal } from './components';

import { parseDateTime } from './util/date-util.js';

class App extends Component {
  constructor(props) {
    super(props);
    let bookings = props.bookings.sort(function(a, b) {
      return new Date(a.start) - new Date(b.start);
    });
    this.state = {
      calendarOpened: false,
      selectedMonth: Date.now(),
      bookings: bookings,
      currentBookings: bookings,
      addBooking: false,
      searching: false,
    };
  }

  toggleCalendar = () => {
    if (this.state.calendarOpened) {
      this.updateDateSelected();
    } else {
      this.updateDateSelected(Date.now())
    }
    this.setState({ calendarOpened: !this.state.calendarOpened });
  }

  updateSelectedMonth = (scrollOffset) => {
    //had to hack it a bit due to lack of proper data from library Component
    let dateHeight = 56;
    let tenYearOffset = 10 * 52;
    let threeWeekOffset = 3;
    let msPerWeek = 7 * 24 * 60 * 60 * 1000;
    let date = new Date((scrollOffset / dateHeight + tenYearOffset + threeWeekOffset) * msPerWeek);
    this.setState({ selectedMonth: Date.parse(date) });
  }

  updateDateSelected = (timestamp) => {
    let currentBookings;
    if (timestamp) {
      currentBookings = this.state.bookings.filter(function(booking) {
        return new Date(booking.start).toDateString() === new Date(timestamp).toDateString();
      });
    } else {
      currentBookings = this.state.bookings;
    }
    this.setState({ currentBookings: currentBookings });
  }

  toggleSearch = () => {
    this.setState({ searching: !this.state.searching });
    this.setState({ currentBookings: this.state.bookings });
  }

  makeSearch = (phrase) => {
    this.setState({
      currentBookings: this.state.bookings.filter(function(booking) {
        let nameContains = booking.eventName.toLowerCase().indexOf(phrase) >= 0;
        let roomContains = booking.roomName.toLowerCase().indexOf(phrase) >= 0;
        return nameContains || roomContains;
      })
    });
  }

  toggleAddBooking = () => {
    this.setState({ addBooking: !this.state.addBooking });
  }

  addBooking = ({ eventName, roomName, date, startTime, endTime }) => {
    let start = parseDateTime(date, startTime);
    let end = parseDateTime(date, endTime);
    this.setState(function(prev) {
      let bookings = prev.bookings;
      bookings.push({ eventName, roomName, start, end });
      bookings.sort(function(a, b) {
        return new Date(a.start) - new Date(b.start);
      });
      return { booking: bookings };
    });
  }
  resize = () => this.forceUpdate()

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  render() {
    let calendar = "";
    if (this.state.calendarOpened) {
      calendar = <Calendar onDateSelect={this.updateDateSelected}
                           onScroll={this.updateSelectedMonth}
                           />
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div id="app">
          <AddBookingModal show={this.state.addBooking}
                         onClose={this.toggleAddBooking}
                         onSubmit={this.addBooking} />
          <Header onTitleClick={this.toggleCalendar}
                  selectedMonth={this.state.selectedMonth}
                  toggleSearch={this.toggleSearch}
                  onMakeSearch={this.makeSearch}
                  onToggleAddBooking={this.toggleAddBooking} />
          { calendar }
          <BookingList bookings={this.state.currentBookings}
                     isCalendarOpened={this.state.calendarOpened}
                     isSearching={this.state.searching}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
