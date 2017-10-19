import React, { Component } from 'react';
import './App.css';
import 'react-infinite-calendar/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import bookingsJson from './bookings';
import Header from './components/Header';
import Calendar from './components/Calendar';
import EventList from './components/EventList';
import AddEventModal from './components/AddEventModal.js';

let bookings = bookingsJson.bookings;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarOpened: false,
      selectedMonth: Date.now(),
      events: bookings,
      addingEvent: false,
    };
  }

  toggleCalendar = () => {
    this.setState({ calendarOpened: !this.state.calendarOpened });
  }

  updateTitleDate = (timeStamp) => {
    this.setState({ selectedMonth: timeStamp });
  }

  makeSearch = (phrase) => {
    this.setState({
      events: bookings.filter(function(event) {
        let nameContains = event.eventName.toLowerCase().indexOf(phrase) >= 0;
        let roomContains = event.roomName.toLowerCase().indexOf(phrase) >= 0;
        return nameContains || roomContains;
      })
    });
  }

  toggleAddEvent = () => {
    this.setState({ addingEvent: !this.state.addingEvent });
  }

  addEvent = ({ eventName, roomName, date, startTime, endTime }) => {
    let start = parseDateTime(date, startTime);
    let end = parseDateTime(date, endTime);
    console.log(eventName, roomName, start, end);
    bookings.push({ eventName, roomName, start, end });
  }

  render() {
    let calendar = this.state.calendarOpened ? <Calendar onDateSelect={this.updateTitleDate} /> : "";
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div id="app">
          <AddEventModal show={this.state.addingEvent}
                         onClose={this.toggleAddEvent}
                         onSubmit={this.addEvent} />
          <Header onTitleClick={this.toggleCalendar}
                  selectedMonth={this.state.selectedMonth}
                  onMakeSearch={this.makeSearch}
                  onToggleAddEvent={this.toggleAddEvent} />
          { calendar }
          <EventList events={this.state.events}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

function parseDateTime(date, time) {
  return `${new Date(date).toDateString()} ${new Date(time).toTimeString()}`;
}

export default App;
