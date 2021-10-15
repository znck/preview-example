function date(days: number) {
  const date = new Date()
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCDate(date.getUTCDate() + days)

  return date.toISOString()
}

export default {
  summary: {
    count: 336,
    uniqueCount: 77,
  },
  pageviews: [
    {
      date: date(-31),
      count: 27,
      uniqueCount: 7,
    },
    {
      date: date(-29),
      count: 26,
      uniqueCount: 7,
    },
    {
      date: date(-28),
      count: 10,
      uniqueCount: 2,
    },
    {
      date: date(-27),
      count: 3,
      uniqueCount: 0,
    },
    {
      date: date(-26),
      count: 8,
      uniqueCount: 3,
    },
    {
      date: date(-25),
      count: 3,
      uniqueCount: 0,
    },
    {
      date: date(-24),
      count: 8,
      uniqueCount: 3,
    },
    {
      date: date(-23),
      count: 8,
      uniqueCount: 0,
    },
    {
      date: date(-22),
      count: 8,
      uniqueCount: 2,
    },
    {
      date: date(-21),
      count: 12,
      uniqueCount: 4,
    },
    {
      date: date(-20),
      count: 15,
      uniqueCount: 2,
    },
    {
      date: date(-19),
      count: 10,
      uniqueCount: 2,
    },
    {
      date: date(-18),
      count: 11,
      uniqueCount: 5,
    },
    {
      date: date(-17),
      count: 6,
      uniqueCount: 0,
    },
    {
      date: date(-16),
      count: 13,
      uniqueCount: 1,
    },
    {
      date: date(-15),
      count: 7,
      uniqueCount: 0,
    },
    {
      date: date(-14),
      count: 13,
      uniqueCount: 6,
    },
    {
      date: date(-13),
      count: 15,
      uniqueCount: 4,
    },
    {
      date: date(-12),
      count: 5,
      uniqueCount: 1,
    },
    {
      date: date(-11),
      count: 3,
      uniqueCount: 1,
    },
    {
      date: date(-10),
      count: 17,
      uniqueCount: 0,
    },
    {
      date: date(-9),
      count: 18,
      uniqueCount: 9,
    },
    {
      date: date(-8),
      count: 9,
      uniqueCount: 2,
    },
    {
      date: date(-7),
      count: 16,
      uniqueCount: 1,
    },
    {
      date: date(-6),
      count: 7,
      uniqueCount: 2,
    },
    {
      date: date(-5),
      count: 9,
      uniqueCount: 0,
    },
    {
      date: date(-4),
      count: 12,
      uniqueCount: 1,
    },
    {
      date: date(-3),
      count: 12,
      uniqueCount: 4,
    },
    {
      date: date(-2),
      count: 11,
      uniqueCount: 2,
    },
    {
      date: date(-1),
      count: 14,
      uniqueCount: 6,
    },
  ],
  sources: [
    {
      key: 'github.com',
      value: 75,
    },
    {
      key: 'www.google.com',
      value: 45,
    },
    {
      key: 'becomeawritertoday.com',
      value: 29,
    },
    {
      key: 't.co',
      value: 26,
    },
    {
      key: 'znck.dev',
      value: 24,
    },
    {
      key: 'medium.com/@znck/grammarly-in-code-b62dd1a4c76e',
      value: 8,
    },
    {
      key: 'duckduckgo.com',
      value: 8,
    },
    {
      key: 'baidu.com',
      value: 7,
    },
    {
      key: 'iwpnd.pw',
      value: 7,
    },
    {
      key: 'medium.com',
      value: 4,
    },
    {
      key: 'medium.com/@znck',
      value: 3,
    },
    {
      key: 'medium.com/@znck/shipping-web-components-with-vue-213ea1e127b3',
      value: 3,
    },
    {
      key: 'www.google.com.hk',
      value: 3,
    },
    {
      key: 'znck.dev/blog/2019-grammarly-in-code',
      value: 2,
    },
    {
      key: 'www.youtube.com',
      value: 2,
    },
  ],
  browsers: [
    {
      key: 'Chrome',
      value: 222,
    },
    {
      key: 'Firefox',
      value: 33,
    },
    {
      key: 'Safari',
      value: 23,
    },
    {
      key: 'Chrome Mobile',
      value: 21,
    },
    {
      key: 'Mobile Safari',
      value: 14,
    },
    {
      key: 'Chrome Mobile WebView',
      value: 11,
    },
    {
      key: 'UC Browser',
      value: 7,
    },
    {
      key: 'LightspeedSystemsCrawler',
      value: 1,
    },
    {
      key: 'HeadlessChrome',
      value: 1,
    },
    {
      key: 'Opera',
      value: 1,
    },
    {
      key: 'Firefox Mobile',
      value: 1,
    },
    {
      key: 'Chrome Mobile iOS',
      value: 1,
    },
  ],
  pages: [
    {
      key: '/',
      value: 143,
    },
    {
      key: '/blog/2019-grammarly-in-code',
      value: 72,
    },
    {
      key: '/blog/2019-shipping-web-components-with-vue',
      value: 64,
    },
    {
      key: '/blog/2019-comments-in-code',
      value: 13,
    },
    {
      key: '/blog/2020-appreciate-feedback',
      value: 10,
    },
    {
      key: '/blog/2018-type-vuex',
      value: 10,
    },
    {
      key: '/blog/2018-type-vue',
      value: 7,
    },
    {
      key: '/blog/2017-first-day',
      value: 6,
    },
    {
      key: '/blog/2019-finally-some-colors',
      value: 5,
    },
    {
      key: '/blog/2017-fiddle-with-vue',
      value: 3,
    },
    {
      key: '/blog/2017-provide-inject',
      value: 2,
    },
    {
      key: '/blog/2019-simple-hard-things',
      value: 1,
    },
  ],
  countries: [
    {
      key: 'IN',
      value: 90,
    },
    {
      key: 'US',
      value: 57,
    },
    {
      key: 'DE',
      value: 23,
    },
    {
      key: 'CN',
      value: 16,
    },
    {
      key: 'FR',
      value: 16,
    },
    {
      key: 'BR',
      value: 14,
    },
    {
      key: 'GB',
      value: 14,
    },
    {
      key: 'SE',
      value: 10,
    },
    {
      key: 'PL',
      value: 9,
    },
    {
      key: 'BG',
      value: 8,
    },
    {
      key: 'CH',
      value: 8,
    },
    {
      key: 'FI',
      value: 5,
    },
    {
      key: 'NL',
      value: 5,
    },
    {
      key: 'NP',
      value: 5,
    },
    {
      key: 'HK',
      value: 4,
    },
  ],
  engagement: [],
}
