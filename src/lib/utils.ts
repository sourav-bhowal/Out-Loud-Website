
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(new Date(date));
}

export const formatTime = (time: string) => {
  // Format 24 hrs time to 12 hrs time
  const [hours, minutes] = time.split(':');
  const parsedHours = parseInt(hours, 10); // Convert hours to a number
  return `${parsedHours % 12 || 12}:${minutes} ${parsedHours >= 12 ? 'PM' : 'AM'}`;
}