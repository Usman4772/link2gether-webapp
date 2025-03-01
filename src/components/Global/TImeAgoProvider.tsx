"use client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";


TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);


export default function TimeAgoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
