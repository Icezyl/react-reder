const moment = require('moment')
moment.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: '1 秒',
    ss: '%d 秒',
    m: "1 分钟",
    mm: "%d 分钟",
    h: "1 小时",
    hh: "%d 小时",
    d: "1 天",
    dd: "%d 天",
    M: "1 月",
    MM: "%d 月",
    y: "1 年",
    yy: "%d 年"
  }
})

export default moment