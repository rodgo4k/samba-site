/** Swap files in /public/media. Keep these filenames. */
export const media = {
  hero: '/media/hero.jpg',
  ask: '/media/ask.jpg',
  language: '/media/language.jpg',
  verified: '/media/verified.jpg',
  app: '/media/app.jpg',
  rent: '/media/rent.jpg',
  sell: '/media/sell.jpg',
  apply: '/media/apply.jpg',
  control: '/media/control.jpg',
  ios: '/media/ios.jpg',
  android: '/media/android.jpg',
  sambinha: '/media/sambinha.jpg',
  boston: '/media/boston.jpg',
  jersey: '/media/jersey.jpg',
  kitchen: '/media/kitchen.jpg',
  street: '/media/street.jpg',
  chat: '/media/chat.jpg',
  splash: '/media/splash.jpg',
  story: '/media/story.jpg',
  howAsk: '/media/how-ask.jpg',
  howApp: '/media/how-app.jpg',
  howDone: '/media/how-done.jpg',
  fitness: '/media/fitness.jpg',
  chef: '/media/chef.jpg',
  beauty: '/media/beauty.jpg',
} as const

export function portrait(id: string) {
  const n = Number(id.replace(/\D/g, '')) || 1
  return `/media/p${((n - 1) % 12) + 1}.jpg`
}
