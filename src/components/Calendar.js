import React, { Component } from 'react';
import 'react-infinite-calendar/styles.css';
import InfiniteCalendar from 'react-infinite-calendar';

class Calendar extends Component {
  render() {
    return (
      <InfiniteCalendar
        width={window.innerWidth}
        height={window.innerHeight / 3}
        keyboardSupport={true}
        displayOptions={{ showHeader: false, showTodayHelper: false}}
        theme={{ selectionColor: '#4B85E8', weekdayColor: '#F5F5F5', textColor: { default:  'white' } }}
        onSelect={this.props.onDateSelect}
        onScroll={this.props.onScroll}
      />
    )
  }
}

export default Calendar;
