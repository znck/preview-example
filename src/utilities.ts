import {
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  onUnmounted,
  readonly,
  ref,
  unref,
  watchEffect,
} from 'vue'
import { SWRState } from '@thesemetrics/composable-swr'

class Random {
  private readonly m = 0x80000000
  private readonly a = 1103515245
  private readonly c = 12345

  constructor(private state: number) {}

  next() {
    this.state = (this.a * this.state + this.c) % this.m

    return this.state
  }

  static default = new Random(42)
}

export function useId() {
  const prefix = '__id-' + Random.default.next().toString(16) + '-'

  return function id(name: string) {
    return prefix + name.toLowerCase().replace(/[^a-z0-9-_]/g, '-')
  }
}

export function asyncComputed<T>(getter: () => Promise<T>) {
  const state = ref<T | undefined>()

  watchEffect(() => {
    getter()
      .then((value) => (state.value = value))
      .catch(() => (state.value = undefined))
  })

  return readonly(state)
}

export function getDateRangeFromToday(days = 30) {
  return {
    from: new Date(Date.now() - days * 24 * 3600 * 1000),
    to: new Date(),
  }
}

export function toDateString(date: Date) {
  return date.toISOString().replace(/T.*Z/i, '')
}

export function getAPIBaseURL(): string {
  if (typeof location !== 'undefined') {
    if (
      location.hostname === 'staging.thesemetrics.org' ||
      location.hostname.endsWith('.staging.thesemetrics.org') ||
      location.hostname.endsWith('--thesemetrics-website-app.netlify.app')
    ) {
      return `https://api.staging.thesemetrics.org`
    }
  }

  return import.meta.env.VITE_API_BASE_URL
}

export function AbsoluteURL(
  template: TemplateStringsArray,
  ...args: Array<string | boolean | number | Date>
) {
  args = args.map((arg) =>
    encodeURIComponent(
      String(arg == null ? '' : arg instanceof Date ? arg.toISOString() : arg),
    ),
  )

  const path = template.reduce(
    (str, item, index) => str + item + (args[index] || ''),
    '',
  )

  return /^(https?:\/\/)/i.test(path) ? path : getAPIBaseURL() + path
}

export function defineResponsiveComponent(mobile: any, desktop: any) {
  return defineComponent({
    name: 'ResponsiveComponentWrapper',
    setup(_, { attrs, slots }) {
      const components = {
        desktop: defineAsyncComponent(desktop),
        mobile: defineAsyncComponent(mobile),
      }
      const isMobile = ref(false)

      if (typeof window !== 'undefined') {
        const media = matchMedia('(max-width: 640px)')
        const setMobile = () => {
          isMobile.value = media.matches
        }

        media.addEventListener('change', setMobile)

        setMobile()

        onUnmounted(() => {
          media.removeEventListener('change', setMobile)
        })
      }

      return () =>
        h(
          unref(isMobile) ? components.mobile : components.desktop,
          attrs,
          slots,
        )
    },
  })
}

export function useStats(state: SWRState<{}, any>, key: string) {
  // TODO(@current): Fix this.
  return computed(() => [])
  // return computed(() => (state.data.value ? state.data.value.data.map((item) => ({ [key]: item.key, count: item.value })) : []));
}

export function toISODateString(date: Date) {
  return [
    date.getFullYear(),
    `${date.getMonth() + 1}`.padStart(2, '0'),
    `${date.getDate()}`.padStart(2, '0'),
  ].join('-')
}

export const ISO_FLAGS: Record<string, string> = {
  AD: '🇦🇩',
  AE: '🇦🇪',
  AF: '🇦🇫',
  AG: '🇦🇬',
  AI: '🇦🇮',
  AL: '🇦🇱',
  AM: '🇦🇲',
  AO: '🇦🇴',
  AQ: '🇦🇶',
  AR: '🇦🇷',
  AS: '🇦🇸',
  AT: '🇦🇹',
  AU: '🇦🇺',
  AW: '🇦🇼',
  AX: '🇦🇽',
  AZ: '🇦🇿',
  BA: '🇧🇦',
  BB: '🇧🇧',
  BD: '🇧🇩',
  BE: '🇧🇪',
  BF: '🇧🇫',
  BG: '🇧🇬',
  BH: '🇧🇭',
  BI: '🇧🇮',
  BJ: '🇧🇯',
  BL: '🇧🇱',
  BM: '🇧🇲',
  BN: '🇧🇳',
  BO: '🇧🇴',
  BQ: '🇧🇶',
  BR: '🇧🇷',
  BS: '🇧🇸',
  BT: '🇧🇹',
  BV: '🇧🇻',
  BW: '🇧🇼',
  BY: '🇧🇾',
  BZ: '🇧🇿',
  CA: '🇨🇦',
  CC: '🇨🇨',
  CD: '🇨🇩',
  CF: '🇨🇫',
  CG: '🇨🇬',
  CH: '🇨🇭',
  CI: '🇨🇮',
  CK: '🇨🇰',
  CL: '🇨🇱',
  CM: '🇨🇲',
  CN: '🇨🇳',
  CO: '🇨🇴',
  CR: '🇨🇷',
  CU: '🇨🇺',
  CV: '🇨🇻',
  CW: '🇨🇼',
  CX: '🇨🇽',
  CY: '🇨🇾',
  CZ: '🇨🇿',
  DE: '🇩🇪',
  DJ: '🇩🇯',
  DK: '🇩🇰',
  DM: '🇩🇲',
  DO: '🇩🇴',
  DZ: '🇩🇿',
  EC: '🇪🇨',
  EE: '🇪🇪',
  EG: '🇪🇬',
  EH: '🇪🇭',
  ER: '🇪🇷',
  ES: '🇪🇸',
  ET: '🇪🇹',
  FI: '🇫🇮',
  FJ: '🇫🇯',
  FK: '🇫🇰',
  FM: '🇫🇲',
  FO: '🇫🇴',
  FR: '🇫🇷',
  GA: '🇬🇦',
  GB: '🇬🇧',
  GD: '🇬🇩',
  GE: '🇬🇪',
  GF: '🇬🇫',
  GG: '🇬🇬',
  GH: '🇬🇭',
  GI: '🇬🇮',
  GL: '🇬🇱',
  GM: '🇬🇲',
  GN: '🇬🇳',
  GP: '🇬🇵',
  GQ: '🇬🇶',
  GR: '🇬🇷',
  GS: '🇬🇸',
  GT: '🇬🇹',
  GU: '🇬🇺',
  GW: '🇬🇼',
  GY: '🇬🇾',
  HK: '🇭🇰',
  HM: '🇭🇲',
  HN: '🇭🇳',
  HR: '🇭🇷',
  HT: '🇭🇹',
  HU: '🇭🇺',
  ID: '🇮🇩',
  IE: '🇮🇪',
  IL: '🇮🇱',
  IM: '🇮🇲',
  IN: '🇮🇳',
  IO: '🇮🇴',
  IQ: '🇮🇶',
  IR: '🇮🇷',
  IS: '🇮🇸',
  IT: '🇮🇹',
  JE: '🇯🇪',
  JM: '🇯🇲',
  JO: '🇯🇴',
  JP: '🇯🇵',
  KE: '🇰🇪',
  KG: '🇰🇬',
  KH: '🇰🇭',
  KI: '🇰🇮',
  KM: '🇰🇲',
  KN: '🇰🇳',
  KP: '🇰🇵',
  KR: '🇰🇷',
  KW: '🇰🇼',
  KY: '🇰🇾',
  KZ: '🇰🇿',
  LA: '🇱🇦',
  LB: '🇱🇧',
  LC: '🇱🇨',
  LI: '🇱🇮',
  LK: '🇱🇰',
  LR: '🇱🇷',
  LS: '🇱🇸',
  LT: '🇱🇹',
  LU: '🇱🇺',
  LV: '🇱🇻',
  LY: '🇱🇾',
  MA: '🇲🇦',
  MC: '🇲🇨',
  MD: '🇲🇩',
  ME: '🇲🇪',
  MF: '🇲🇫',
  MG: '🇲🇬',
  MH: '🇲🇭',
  MK: '🇲🇰',
  ML: '🇲🇱',
  MM: '🇲🇲',
  MN: '🇲🇳',
  MO: '🇲🇴',
  MP: '🇲🇵',
  MQ: '🇲🇶',
  MR: '🇲🇷',
  MS: '🇲🇸',
  MT: '🇲🇹',
  MU: '🇲🇺',
  MV: '🇲🇻',
  MW: '🇲🇼',
  MX: '🇲🇽',
  MY: '🇲🇾',
  MZ: '🇲🇿',
  NA: '🇳🇦',
  NC: '🇳🇨',
  NE: '🇳🇪',
  NF: '🇳🇫',
  NG: '🇳🇬',
  NI: '🇳🇮',
  NL: '🇳🇱',
  NO: '🇳🇴',
  NP: '🇳🇵',
  NR: '🇳🇷',
  NU: '🇳🇺',
  NZ: '🇳🇿',
  OM: '🇴🇲',
  PA: '🇵🇦',
  PE: '🇵🇪',
  PF: '🇵🇫',
  PG: '🇵🇬',
  PH: '🇵🇭',
  PK: '🇵🇰',
  PL: '🇵🇱',
  PM: '🇵🇲',
  PN: '🇵🇳',
  PR: '🇵🇷',
  PS: '🇵🇸',
  PT: '🇵🇹',
  PW: '🇵🇼',
  PY: '🇵🇾',
  QA: '🇶🇦',
  RE: '🇷🇪',
  RO: '🇷🇴',
  RS: '🇷🇸',
  RU: '🇷🇺',
  RW: '🇷🇼',
  SA: '🇸🇦',
  SB: '🇸🇧',
  SC: '🇸🇨',
  SD: '🇸🇩',
  SE: '🇸🇪',
  SG: '🇸🇬',
  SH: '🇸🇭',
  SI: '🇸🇮',
  SJ: '🇸🇯',
  SK: '🇸🇰',
  SL: '🇸🇱',
  SM: '🇸🇲',
  SN: '🇸🇳',
  SO: '🇸🇴',
  SR: '🇸🇷',
  SS: '🇸🇸',
  ST: '🇸🇹',
  SV: '🇸🇻',
  SX: '🇸🇽',
  SY: '🇸🇾',
  SZ: '🇸🇿',
  TC: '🇹🇨',
  TD: '🇹🇩',
  TF: '🇹🇫',
  TG: '🇹🇬',
  TH: '🇹🇭',
  TJ: '🇹🇯',
  TK: '🇹🇰',
  TL: '🇹🇱',
  TM: '🇹🇲',
  TN: '🇹🇳',
  TO: '🇹🇴',
  TR: '🇹🇷',
  TT: '🇹🇹',
  TV: '🇹🇻',
  TW: '🇹🇼',
  TZ: '🇹🇿',
  UA: '🇺🇦',
  UG: '🇺🇬',
  UM: '🇺🇲',
  US: '🇺🇸',
  UY: '🇺🇾',
  UZ: '🇺🇿',
  VA: '🇻🇦',
  VC: '🇻🇨',
  VE: '🇻🇪',
  VG: '🇻🇬',
  VI: '🇻🇮',
  VN: '🇻🇳',
  VU: '🇻🇺',
  WF: '🇼🇫',
  WS: '🇼🇸',
  XK: '🇽🇰',
  YE: '🇾🇪',
  YT: '🇾🇹',
  ZA: '🇿🇦',
  ZM: '🇿🇲',

  XX: '🏴‍☠️',
  T1: '🚩',
}

export function getFlag(countryCode: string) {
  return ISO_FLAGS[countryCode] || '🏳'
}

export const ISO_COUNTRIES: Record<string, string> = {
  AF: 'Afghanistan',
  AX: 'Aland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua And Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia And Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, Democratic Republic',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: "Cote D'Ivoire",
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island & Mcdonald Islands',
  VA: 'Holy See (Vatican City State)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran, Islamic Republic Of',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle Of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KR: 'Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: "Lao People's Democratic Republic",
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libyan Arab Jamahiriya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia, Federated States Of',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestinian Territory, Occupied',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthelemy',
  SH: 'Saint Helena',
  KN: 'Saint Kitts And Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin',
  PM: 'Saint Pierre And Miquelon',
  VC: 'Saint Vincent And Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome And Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia And Sandwich Isl.',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard And Jan Mayen',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad And Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks And Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis And Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',

  // Custom
  XX: 'Unknown',
  T1: 'TOR',
}

export function getCountryName(countryCode: string) {
  return ISO_COUNTRIES[countryCode] || countryCode
}
