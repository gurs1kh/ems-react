import React, { Component } from 'react';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import dateFormat from 'dateformat';
import Infinite from 'react-infinite';

import ListForDate from './ListForDate';

class EventList extends Component {
  render() {
    let eventsByDate = this.getEventsByDate(this.props.events)
    if (eventsByDate.length <= 0) {
      eventsByDate = (
        <div className="no-event">
          There are no scheduled events with the given parameters
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
        <List className="event-list">
          <Subheader></Subheader> {/* Needed to prevent top padding */}
          { eventsByDate }
        </List>
      </Infinite>
    );
  }

  getEventsByDate(events) {
    let eventsByDate = [];
    events.forEach(function(event) {
      let start = getDate(event.start);
      if (!eventsByDate[start]) {
        eventsByDate[start] = {
          date: start,
          events: [],
        }
      }
      eventsByDate[start].events.push(event);
    });
    return Object.keys(eventsByDate).map(function(date, i, keys) {
      let emptyDays = getEmptyDays(date, keys[i + 1]);
      return (
        <div key={date} >
          <ListForDate date={date} events={eventsByDate[date].events} />
          { emptyDays }
        </div>
      );
    });
  }
}

function getDate(timestamp) {
  return new Date(new Date(timestamp).toDateString()).getTime();
}

function getEmptyDays(day1, day2) {
  if (!day1 || !day2) return "";
  day1 = new Date(parseInt(day1, 10));
  day2 = new Date(parseInt(day2, 10));

  let tomorrow = new Date(day1);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (tomorrow.toDateString() === new Date(day2).toDateString()) {
    return "";
  }
  let yesterday = new Date(day2);
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    <div>
      <Divider />
      <Subheader className="date-header">{formatDate(tomorrow) + ' - ' + formatDate(yesterday)}</Subheader>
      <div style={{padding:"1em"}}>You have no bookings for these dates</div>
      <Divider />
    </div>
  );
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let format = "ddd mmm dd";
  if (date.getFullYear() !== new Date().getFullYear()) {
    format += ' yyyy';
  }
  let formattedDate = dateFormat(date, format).toUpperCase();
  if (sameDate(timestamp, Date.now())) {
    formattedDate = "TODAY " + formattedDate;
  }
  return formattedDate;
}

function sameDate(timestamp1, timestamp2) {
  let date1 = new Date(timestamp1).toDateString();
  let date2 = new Date(timestamp2).toDateString();
  return date1 === date2;
}

export default EventList;
