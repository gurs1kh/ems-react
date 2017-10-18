import React, { Component } from 'react';
import './App.css';
import 'react-infinite-calendar/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import bookingsJson from './bookings';
import Header from './components/Header';
import Calendar from './components/Calendar';
import EventList from './components/EventList';

const bookings = bookingsJson.bookings;

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.updateTitleDate = this.updateTitleDate.bind(this);
    this.makeSearch = this.makeSearch.bind(this);
    this.state = { calendarOpened: false, selectedMonth: Date.now(), events: bookings };
  }

  toggleCalendar() {
    this.setState({ calendarOpened: !this.state.calendarOpened });
  }

  updateTitleDate(timeStamp) {
    this.setState({ selectedMonth: timeStamp });
  }

  makeSearch(phrase) {
    this.setState({
      events: bookings.filter(function(event) {
        let nameContains = event.eventName.toLowerCase().indexOf(phrase) >= 0;
        let roomContains = event.roomName.toLowerCase().indexOf(phrase) >= 0;
        return nameContains || roomContains;
      })
    });
  }

  render() {
    let calendar = this.state.calendarOpened ? <Calendar onDateSelect={this.updateTitleDate} /> : "";
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div id="app">
          <Header onTitleClick={this.toggleCalendar}
                  selectedMonth={this.state.selectedMonth}
                  onMakeSearch={this.makeSearch} />
          { calendar }
          <EventList events={this.state.events}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
