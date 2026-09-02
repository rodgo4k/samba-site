import { PROFESSIONALS, type Professional } from '../data/professionals'

export type SearchResult =
  | { kind: 'pros'; text: string; pros: Professional[] }
  | { kind: 'housing'; text: string }
  | { kind: 'text'; text: string }

const DEMO_PROS = ['p1', 'p4', 'p10']
  .map((id) => PROFESSIONALS.find((p) => p.id === id))
  .filter((p): p is Professional => Boolean(p))

function localSearch(query: string): SearchResult {
  const q = query.trim()
  if (!q) {
    return {
      kind: 'text',
      text: 'Tell Samba AI what you need: a cleaner, a lawyer, a room. Matches open in the app.',
    }
  }

  return {
    kind: 'pros',
    text: 'People nearby. Open Samba to hire and message.',
    pros: DEMO_PROS,
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
    }
  }
  return localSearch(query)
}
