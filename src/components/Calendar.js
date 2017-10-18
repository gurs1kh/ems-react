import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import { goToAnchor } from 'react-scrollable-anchor'

class Calendar extends Component {
  render() {
    return (
      <InfiniteCalendar
        width={window.innerWidth}
        height={window.innerHeight / 3}
        selectedDate={Date.now()}
        keyboardSupport={true}
        displayOptions={{
          showHeader: true
        }}
        onSelect={this.scrollTo.bind(this)}
      />
    )
  }

  scrollTo(date) {
    let timeStamp = new Date(date).getTime();
    goToAnchor(`time${timeStamp}`);
    this.props.onDateSelect(timeStamp);
  }
}

export default Calendar;
