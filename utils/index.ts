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
//将时间与本地时间比较，返回相差的时间
export const getDiffTime = (time: string) => {
  const date = new Date()
  const offset = 8
  // 本地时间与格林威治时间的时间差，单位为小时
  const bjt = new Date(date.getTime() + offset * 60 * 60 * 1000)
  const diff = new Date(bjt).getTime() - new Date(time).getTime()
  const diffDay = Math.floor(diff / (24 * 3600 * 1000))
  const diffHour = Math.floor((diff / (3600 * 1000)) % 24)
  const diffMinute = Math.floor((diff / (60 * 1000)) % 60)
  const diffSecond = Math.floor((diff / 1000) % 60)
  if (diffDay > 0) {
    return `${diffDay}天前`
  } else if (diffHour > 0) {
    return `${diffHour}小时前`
  } else if (diffMinute > 0) {
    return `${diffMinute}分钟前`
  } else if (diffSecond > 0) {
    return `${diffSecond}秒前`
  } else {
    return "刚刚"
  }
}
