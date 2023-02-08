import { AppContext } from "next/app";

export const LOCALDOMAIN = "http://127.0.0.1:3000";
export const CMSDOMAIN = "http://127.0.0.1:1337";
export const SERVERDOMAIN="http://101.42.229.5:1337";

export const getIsMobile = (context: AppContext) => {
  const { headers = {} } = context.ctx.req || {};
  return /mobile|android|iphone|ipad|phone/i.test(
    (headers["user-agent"] || "").toLowerCase()
  );
};

export const getIsSupportWebp = (context: AppContext) => {
  const { headers = {} } = context.ctx.req || {};
  return headers.accept?.includes("image/webp");
};

export function TimeCal(date: string): string {
  let timestamp = new Date()
  let cur_year = timestamp.getFullYear()
  let cur_month = timestamp.getMonth() + 1
  let cur_day = timestamp.getDate()
  let cur_hour = timestamp.getHours()
  let cur_min = timestamp.getMinutes()
  let cur_sec = timestamp.getSeconds()
  let year = Number(date.slice(0, 4))
  //console.log(year)
  let gap_year = cur_year - year
  if (gap_year > 0) {
    return gap_year.toString() + "年前"
  }
  if (gap_year < 0) {
    return "时间计算错误"
  }
  let month = Number(date.slice(5, 7))
  let gap_month = cur_month - month
  if (gap_month > 0) {
    return gap_month.toString() + "月前"
  }
  if (gap_month < 0) {
    return "时间计算错误"
  }
  let day = Number(date.slice(8, 10))
  let gap_day = cur_day - day
  if (gap_day > 0) {
    return gap_day.toString() + "天前"
  }
  if (gap_day < 0) {
    return "时间计算错误"
  }
  let hour = Number(date.slice(11, 13))+8
  let gap_hour = cur_hour - hour
  if (gap_hour > 0) {
    return gap_hour.toString() + "小时前"
  }
  if (gap_hour < 0) {
    return "时间计算错误"
  }
  let sec = Number(date.slice(11, 13))
  let gap_sec = cur_sec - sec
  if (gap_sec > 0) {
    return gap_sec.toString() + "秒前"
  }
  return "时间计算有误"
}