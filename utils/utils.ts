type dateString = (
  date: Date,
  hideYear?: boolean,
  preformattedDate?: string | null,
  onlyDate?: boolean
) => string

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const getFormat: dateString = (
  date,
  hideYear = false,
  preformattedDate = null,
  onlyDate = false,
) => {
  const day = date.getDate()
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  if (onlyDate)
    return `${day} ${month} ${year}`

  let minutesString = `${minutes}`
  if (minutes < 10) {
    // Adding leading zero to minutes
    minutesString = `0${minutes}`
  }

  if (preformattedDate) {
    // Today at 4:20
    return `${preformattedDate} at ${hours}:${minutesString}`
  }

  if (hideYear)
    return `${day} ${month} at ${hours}:${minutesString}`

  return `${day} ${month} ${year} at ${hours}:${minutesString}`
}

export function formatDate(input: string | Date | number, dateOnly = false) {
  const date = input instanceof Date ? input : new Date(input)
  const DAY_IN_MS = 86400000 // 24 * 60 * 60 * 1000
  const today = new Date()
  const seconds = Math.round((today.getTime() - date.getTime()) / 1000)

  if (seconds < 0 || dateOnly)
    return getFormat(date, false, null, true)

  if (seconds < 5)
    return 'now'

  if (seconds < 60)
    return `${seconds} seconds ago`

  const minutes = Math.round(seconds / 60)
  if (minutes < 60)
    return `${minutes} minutes ago`

  const yesterday = new Date(today.getTime() - DAY_IN_MS)
  const isToday = today.toDateString() === date.toDateString()
  const isYesterday = yesterday.toDateString() === date.toDateString()
  if (isToday)
    return getFormat(date, true, 'Today')

  if (isYesterday)
    return getFormat(date, true, 'Yesterday')

  const isThisYear = today.getFullYear() === date.getFullYear()
  if (isThisYear)
    return getFormat(date, true)

  return getFormat(date)
}

export function getMonthYear(dateString: Date | string): string {
  const dateObj = new Date(dateString)
  const monthName = dateObj.toLocaleString('default', { month: 'long' })
  const year = dateObj.getFullYear().toString()
  const monthYearString = `${monthName}, ${year}`
  return monthYearString
}

export function stringToHslColor(str: string, s = 40, l = 80) {
  let hash = 0
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash)

  const h = hash % 360
  return `hsl(${h}, ${s}%, ${l}%)`
}

export default function readingTime(content: any) {
  let minutes = 0
  const contentAsString = JSON.stringify(content)
  const words = contentAsString.split(' ').length
  const wordsPerMinute = 200

  minutes = Math.ceil(words / wordsPerMinute)

  return minutes
}

export const fallbackUrls = [
  'https://img.freepik.com/premium-photo/faces-betrayal-capturing-essence-corruption-through-lens-truth_1143425-3869.jpg',
  'https://www.shutterstock.com/image-vector/corrupt-politician-pig-face-600nw-2204328455.jpg',
  'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2019/03/African_Politics_Effect_on_Civilians_Colours-scaled.jpg',
  'https://miro.medium.com/v2/resize:fit:792/1*yAYylwmZly_DGXWvUeaVdA.jpeg',
  'https://st.depositphotos.com/2251265/2536/i/450/depositphotos_25364891-stock-photo-man-in-the-suit-with.jpg',
]

export function randomFallbackUrl() {
  const randomIndex = Math.floor(Math.random() * fallbackUrls.length)
  return fallbackUrls[randomIndex]
}

export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url)
    return false
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
  return imageExtensions.some(extension => url.toLowerCase().endsWith(extension))
}

export enum LegalOutcome {
  GuiltyVerdict = 'Guilty Verdict',
  Pending = 'Still in Court',
  Dismissal = 'Dismissal',
  Settled = 'Settled',
  NotGuiltyVerdict = 'Not Guilty Verdict',
  JudgmentForPlaintiff = 'Judgment for Plaintiff',
  JudgmentForDefendant = 'Judgment for Defendant',
  PleaBargain = 'Plea Bargain',
  Injunction = 'Injunction',
  Probation = 'Probation',
  CommunityService = 'Community Service',
  MonetaryDamages = 'Monetary Damages',
  Reparations = 'Reparations',
  Mistrial = 'Mistrial',
  Appeal = 'Appeal',
  ArbitrationAward = 'Arbitration Award',
}

export const legalOutcomesArray = Object.values(LegalOutcome)

export function areAllValuesPresent(...args: Array<any>): boolean {
  return args.every(arg => arg !== undefined && arg !== null && arg !== '')
}

// https://stackoverflow.com/questions/1484506/random-color-generator
export function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const socialMediaShare = [
  'facebook',
  'twitter',
  'linkedin',
  'pinterest',
  'reddit',
  'bluesky',
  'pocket',
  'whatsapp',
  'telegram',
  'skype',
  'line',
  'email',
]

// Helper function to identify network errors (you can customize this logic)
export function isNetworkError(error: any): boolean {
  return (
    error.code === 'ECONNREFUSED' // Connection refused
    || error.code === 'ETIMEOUT' // Timeout
    || error.message.includes('Network') // Generic network error message check
  )
}
