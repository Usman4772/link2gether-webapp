import clsx, {ClassValue} from "clsx";
import dayjs from "dayjs";
import millify from "millify";
import {twMerge} from "tailwind-merge";
import {profanity} from "@2toad/profanity";
import {detect} from "tinyld";
import axios from "axios";


export function getFormattedDate(date: string): string {
  if (!date) return "";
  return dayjs(date).format("DD-MM-YYYY");
}
export function getFormattedTime(date: string): string {
  if (!date) return "";
  return dayjs(date).format("hh:mm A");
}
export function capitalize(text: string): string {
  if (!text) return "";
  const data = text.charAt(0).toUpperCase() + text.slice(1);
  return data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertNumberToK(
  number: number,
  precision = 2,
  space = true
): string {
  return millify(number, { precision: precision, space: space });
}


export function isVulgar(content:string){
  if(!content) return false
  return profanity.exists(content)
}


export function censor(content:string | null){
  if(!content) return ""
  return profanity.censor(content)
}



export async function translate(text:string){
  if(!text)return ""
  const sourceLang=detect(text)
  console.log(sourceLang,'sourceLang')
  const response=await axios.post(`https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|en`)
  console.log(response,'result')
  if(response?.data?.responseStatus==200){
    return response?.data?.responseData?.translatedText
  }
  return ""
}