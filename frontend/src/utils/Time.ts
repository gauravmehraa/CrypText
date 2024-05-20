import { useSettingsContext } from "../context/SettingsContext";

export function Time(dateString: string) {
  const { settings } = useSettingsContext();
  const date: Date = new Date(dateString);
  let hours: number = date.getHours();
  let meridian: string = 'AM';
  
  if (!settings?.timeFormat || false) {
    if (hours >= 12) {
      meridian = 'PM';
      if (hours > 12) hours -= 12;
    } else if (hours === 0) hours = 12;
  }
  const paddedHours: string = padZero(hours);
  const minutes: string = padZero(date.getMinutes());
  
  return `${paddedHours}:${minutes}${!settings?.timeFormat || false ? meridian : ''}`;
}

function padZero(number: number) {
  return number.toString().padStart(2, "0");
}