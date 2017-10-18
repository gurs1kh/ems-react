import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import ListForDate from './ListForDate';

class EventList extends Component {
  render() {
    let eventsByDate = this.getEventsByDate(this.props.events)
    if (eventsByDate.length <= 0) {
      eventsByDate = (<div>There are no scheduled events</div>);
    }
    return (
      <List className="event-list">
        <Subheader></Subheader> {/* Needed to prevent top padding */}
        {eventsByDate}
      </List>
    );
  }

  getEventsByDate(events) {
    let eventsByDate = [];
    events = events.sort(function(a, b) {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });
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
    return Object.keys(eventsByDate).map(function(date) {
      return (
        <ListForDate key={date} date={date} events={eventsByDate[date].events} />
      );
    });
  }
}

function getDate(timeStamp) {
  return new Date(new Date(timeStamp).toDateString()).getTime();
}

export default EventList;
