export const APP_STORE =
  'https://apps.apple.com/us/app/samba-hub-for-professionals/id6753193921'
export const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.sambaapp.foretheist'

export function storeUrl() {
  if (typeof navigator === 'undefined') return APP_STORE
  const ua = navigator.userAgent
  if (/android/i.test(ua)) return PLAY_STORE
  return APP_STORE
}

export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sambaapp' },
  { label: 'X (Twitter)', href: 'https://x.com/sambaapp' },
  { label: 'Instagram', href: 'https://instagram.com/joinsamba' },
] as const

export const FORETHEIST = 'https://www.foretheist.com'
export const YANKEE = 'https://www.yankee.app'
export const SUPPORT = 'mailto:support@samba.social'
