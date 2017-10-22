import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from './components/Header';
import Calendar from './components/Calendar';
import EventList from './components/EventList';
import AddEventModal from './components/AddEventModal.js';

class App extends Component {
  constructor(props) {
    super(props);
    let bookings = props.bookings.sort(function(a, b) {
      return new Date(a.start) - new Date(b.start);
    });
    this.state = {
      calendarOpened: false,
      selectedMonth: Date.now(),
      events: bookings,
      currentEvents: bookings,
      addingEvent: false,
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
    let currentEvents;
    if (timestamp) {
      currentEvents = this.state.events.filter(function(event) {
        return new Date(event.start).toDateString() === new Date(timestamp).toDateString();
      });
    } else {
      currentEvents = this.state.events;
    }
    this.setState({ currentEvents: currentEvents });
  }

  toggleSearch = () => {
    this.setState({ searching: !this.state.searching });
    this.setState({ currentEvents: this.state.events });
  }

  makeSearch = (phrase) => {
    this.setState({
      currentEvents: this.state.events.filter(function(event) {
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
    this.setState(function(prev) {
      let events = prev.events;
      events.push({ eventName, roomName, start, end });
      events.sort(function(a, b) {
        return new Date(a.start) - new Date(b.start);
      });
      return { event: events };
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
          <AddEventModal show={this.state.addingEvent}
                         onClose={this.toggleAddEvent}
                         onSubmit={this.addEvent} />
          <Header onTitleClick={this.toggleCalendar}
                  selectedMonth={this.state.selectedMonth}
                  toggleSearch={this.toggleSearch}
                  onMakeSearch={this.makeSearch}
                  onToggleAddEvent={this.toggleAddEvent} />
          { calendar }
          <EventList events={this.state.currentEvents}
                     isCalendarOpened={this.state.calendarOpened}
                     isSearching={this.state.searching}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

function parseDateTime(date, time) {
  return `${new Date(date).toDateString()} ${new Date(time).toTimeString()}`;
}

export default App;
