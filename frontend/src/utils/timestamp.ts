export const generateTimestamp = (dateString: string, timeFormat: boolean) => {
  const date: Date = new Date(dateString);
  let hours: number = date.getHours();
  let meridian: string = 'AM';
  
  if (!timeFormat || false) {
    if (hours >= 12) {
      meridian = 'PM';
      if (hours > 12) hours -= 12;
    } else if (hours === 0) hours = 12;
  }
  const paddedHours: string = padZero(hours);
  const minutes: string = padZero(date.getMinutes());
  
  return `${paddedHours}:${minutes}${!timeFormat || false ? meridian : ''}`;
}

export const padZero = (number: number) => {
  return number.toString().padStart(2, "0");
}