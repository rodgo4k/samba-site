import { PROFESSIONALS, type Professional } from '../data/professionals'

export type SearchResult =
  | { kind: 'pros'; text: string; pros: Professional[] }
  | { kind: 'housing'; text: string }
  | { kind: 'text'; text: string }

const HOUSING =
  /\b(rent|rental|room|quarto|apartment|apt|lease|landlord|housing|home|house|condo|listing|sell|sale|realtor|deposit|aluguel|imovel|imóvel)\b/i

const SELL = /\b(sell|sale|selling|list my|realtor|broker)\b/i

const LANG: [RegExp, string][] = [
  [/\b(portugu|brazil|brasileir)\w*/i, 'Portuguese'],
  [/\b(spanish|espanhol|latino|latina|mexic)\w*/i, 'Spanish'],
  [/\b(haitian|kreyol|creole)\w*/i, 'Haitian Creole'],
  [/\b(mandarin|chinese|chinês|chines)\w*/i, 'Mandarin'],
  [/\b(vietnamese|viet)\w*/i, 'Vietnamese'],
  [/\b(arabic|arabe|árabe)\w*/i, 'Arabic'],
  [/\b(french|franc[eê]s)\w*/i, 'French'],
]

function fold(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
}

function tokens(q: string) {
  return fold(q)
    .split(/[^a-z0-9+]+/)
    .filter((t) => t.length > 1)
}

function langHint(q: string) {
  for (const [re, lang] of LANG) if (re.test(q)) return lang
  return null
}

function score(pro: Professional, qTokens: string[], lang: string | null) {
  const hay = fold(
    [pro.name, pro.profession, pro.category, ...pro.keywords, ...pro.languages].join(
      ' ',
    ),
  )
  let n = 0
  for (const t of qTokens) {
    if (hay.includes(t)) n += t.length > 4 ? 3 : 2
  }
  if (lang && pro.languages.includes(lang)) n += 6
  return n
}

function housingCopy(q: string): SearchResult {
  const selling = SELL.test(q)
  return {
    kind: 'housing',
    text: selling
      ? 'List a home or room in the app. Samba caps what renters can be asked to put down, never more than two months’ rent, and keeps applications flexible. Open Samba to post or browse.'
      : 'Rooms and homes live in the app. Samba forbids asking for more than two months’ rent, and applications flex with real life. Open Samba to browse, apply, or list.',
  }
}

function localSearch(query: string): SearchResult {
  const q = query.trim()
  if (!q) {
    return {
      kind: 'text',
      text: 'Tell Sambinha what you need: a cleaner, a lawyer, a room. Matches open in the app.',
    }
  }

  const qTokens = tokens(q)
  const wantsHousing = HOUSING.test(q)
  const wantsWork = qTokens.some((t) =>
    PROFESSIONALS.some(
      (p) =>
        fold(p.profession).includes(t) ||
        p.keywords.some((k) => fold(k).includes(t)) ||
        p.category.includes(t),
    ),
  )

  if (wantsHousing && !wantsWork) return housingCopy(q)

  const lang = langHint(q)
  const ranked = PROFESSIONALS.map((p) => ({
    p,
    n: score(p, qTokens, lang),
  }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((x) => x.p)

  if (ranked.length) {
    const langBit = lang ? ` who speak ${lang}` : ''
    return {
      kind: 'pros',
      text: wantsHousing
        ? `Here are people${langBit} for that. Housing is in the app. Two months’ rent max, flexible applications. Hire and apply there.`
        : `Here are people${langBit} nearby. Tap hire to continue in the app. That’s where messaging and booking happen.`,
      pros: ranked,
    }
  }

  if (wantsHousing) return housingCopy(q)

  return {
    kind: 'text',
    text: 'Sambinha can keep going in the app. Search, chat, and hire live there. Nothing books on the website.',
  }
}

export async function searchSamba(query: string): Promise<SearchResult> {
  const base = import.meta.env.VITE_SAMBA_API_URL as string | undefined
  if (base) {
    try {
      const r = await fetch(
        `${base.replace(/\/$/, '')}/search?q=${encodeURIComponent(query)}`,
      )
      if (r.ok) return (await r.json()) as SearchResult
    } catch {
      /* fall through */
    }
  }
  return localSearch(query)
}

export function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export function tone(id: string) {
  const tones = ['#309257', '#3d5a4c', '#6b5344', '#1e4d3a', '#8a6a3d']
  let h = 0
  for (const c of id) h = (h + c.charCodeAt(0)) % tones.length
  return tones[h]
}
