
export function timeStamp(timestamp) {
  
  const parts = getDifferencefromNow(timestamp);
  const { years, months, days, hours, mins, seconds } = parts;
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