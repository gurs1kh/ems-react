import dateFormat from 'dateformat';

export function getDate(timestamp) {
  return new Date(new Date(timestamp).toDateString()).getTime();
}

export function parseDateTime(date, time) {
  return `${new Date(date).toDateString()} ${new Date(time).toTimeString()}`;
}

export function formatTime(timestamp) {
  let date = new Date(timestamp);
  return dateFormat(date, "h:MM TT");
}

export function formatDate(timestamp) {
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

export function sameDate(timestamp1, timestamp2) {
  let date1 = new Date(timestamp1).toDateString();
  let date2 = new Date(timestamp2).toDateString();
  return date1 === date2;
}

export function getEmptyDays(day1, day2) {
  if (!day1 || !day2) return "";
  day1 = new Date(parseInt(day1, 10));
  day2 = new Date(parseInt(day2, 10));

  let start = new Date(day1);
  start.setDate(start.getDate() + 1);
  if (start.toDateString() === new Date(day2).toDateString()) {
    return "";
  }
  let end = new Date(day2);
  end.setDate(end.getDate() - 1);
  return { start, end };
}

export default { getDate, parseDateTime, formatTime, formatDate, sameDate, getEmptyDays };
