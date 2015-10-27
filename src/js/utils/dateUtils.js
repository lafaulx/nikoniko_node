export function getDateObj(date) {
  return {
    y: date.getFullYear(),
    m: date.getMonth(),
    d: date.getDate()
  };
}