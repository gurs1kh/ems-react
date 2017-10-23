import dateFormat from 'dateformat';

export function getDate(timestamp) {
  return new Date(new Date(timestamp).toDateString()).getTime();
}

export function parseDateTime(date, time) {
  return `${new Date(date).toDateString()} ${new Date(time).toTimeString()}`;
}

export function formatDate(timestamp) {
  let date = new Date(timestamp);
  let now = new Date();
  let format = "ddd mmm dd";
  if (date.getFullYear() !== now.getFullYear()) {
    format += ' yyyy';
  }
  let formattedDate = dateFormat(date, format).toUpperCase();
  if (date.toDateString() === now.toDateString()) {
    formattedDate = "TODAY " + formattedDate;
  }
  return formattedDate;
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

export default { getDate, parseDateTime, formatDate, getEmptyDays };
