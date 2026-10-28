export function dateHandler(inputDate) {
  if (!inputDate) {
    return "-";
  }

  const date = new Date(inputDate);

  if (Number.isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}
