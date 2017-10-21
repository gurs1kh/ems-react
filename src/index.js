import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import bookingsJson from './bookings';
let bookings = bookingsJson.bookings;

ReactDOM.render(<App bookings={bookings}/>, document.getElementById('root'));
registerServiceWorker();
