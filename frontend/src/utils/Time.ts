export function Time(dateString: string){
  const date: Date = new Date(dateString);
  const hours: string = padZero(date.getHours());
  const minutes: string = padZero(date.getMinutes());
  return `${hours}:${minutes}`
}

function padZero(number: number){
  return number.toString().padStart(2, "0");
}