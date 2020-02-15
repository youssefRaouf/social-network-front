import moment from 'moment'
 function getDifferencefromNow(timestamp) {
 const time= new Date(timestamp).getTime();
 const current = new Date().getTime();
  const diff = (Math.round(current - time) / 1000);
  const years = Math.floor(diff / (86400 * 365));
  const months = Math.floor(diff / (86400 * 30));
  const days = Math.floor(diff / 86400);
  const hours = Math.floor(diff / 3600);
  const mins = Math.floor(diff / 60);
  const seconds = Math.floor(diff);
  return { years, months, days, hours, mins, seconds };
}
export function timeStamp(timestamp) {
  
  const parts = getDifferencefromNow(timestamp);
  const { years, months, days, hours, mins, seconds } = parts;
  // console.log(parts)
  if ((years && years > 0) || (months && months > 0) || (days && days >= 8)) {
    return moment(timestamp).format('MM/DD/YY');
  }
  if (days && days > 0) {
    return `${days}d ago`;
  }
  if (hours && hours > 0) {
    return `${hours}h ago`;
  }
  if (mins && mins > 0) {
    return `${mins}m ago`;
  }
  if (seconds > 1) return `${seconds}s ago`;
  return 'Just now';
}