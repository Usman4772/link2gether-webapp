import clsx, { ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function getFormattedDate(date: string): string {
  if (!date) return "";
  return dayjs(date).format("DD-MM-YYYY");
}

export function capitalize(text: string): string {
  if (!text) return "";
  const data = text.charAt(0).toUpperCase() + text.slice(1);
  return data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
