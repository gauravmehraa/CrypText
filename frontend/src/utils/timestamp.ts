export const generateTimestamp = (dateString: string, timeFormat: boolean, dateFormat: boolean) => {
  const date: Date = new Date(dateString);
  let hours: number = date.getHours();
  let meridian: string = 'AM';
  
  if (!timeFormat) {
    if (hours >= 12) {
      meridian = 'PM';
      if (hours > 12) hours -= 12;
    } else if (hours === 0) hours = 12;
  }
  const paddedHours: string = padZero(hours);
  const minutes: string = padZero(date.getMinutes());
  return `${dateFormat? generateDatestamp(dateString) : '' } ${paddedHours}:${minutes}${!timeFormat || false ? meridian : ''}`;
}

export const padZero = (number: number) => {
  return number.toString().padStart(2, "0");
}

export function generateDatestamp(timestamp: string): string {
  const today = new Date();
  const targetDate = new Date(timestamp);

  const diffTime = Math.abs(today.getTime() - targetDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
      return 'Today';
  } else if (diffDays === 1) {
      return 'Yesterday';
  } else if (diffDays <= 7) {
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return weekdays[targetDate.getDay()];
  } else {
      const dd = String(targetDate.getDate()).padStart(2, '0');
      const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
      return `${dd}-${mm}`;
  }
}