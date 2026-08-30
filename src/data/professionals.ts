export type Professional = {
  id: string
  name: string
  profession: string
  category: string
  languages: string[]
  city: string
  keywords: string[]
  photo?: string
}

export const CATEGORIES = [
  { id: 'housing', label: 'Rent a room', fresh: true },
  { id: 'cleaning', label: 'House cleaning' },
  { id: 'beauty', label: 'Hair & beauty' },
  { id: 'fitness', label: 'Personal trainer' },
  { id: 'food', label: 'Private chef' },
  { id: 'legal', label: 'Immigration' },
  { id: 'trades', label: 'Trades' },
] as const

export const PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    name: 'Camila Alves',
    profession: 'House cleaner',
    category: 'cleaning',
    languages: ['Portuguese', 'English'],
    city: 'Somerville, MA',
    keywords: ['clean', 'cleaning', 'faxina', 'housekeeper', 'maid', 'deep clean'],
  },
  {
    id: 'p2',
    name: 'Marie Jean',
    profession: 'House cleaner',
    category: 'cleaning',
    languages: ['Haitian Creole', 'French', 'English'],
    city: 'Everett, MA',
    keywords: ['clean', 'cleaning', 'housekeeper', 'residential'],
  },
  {
    id: 'p3',
    name: 'Rosa Delgado',
    profession: 'House cleaner',
    category: 'cleaning',
    languages: ['Spanish', 'English'],
    city: 'Newark, NJ',
    keywords: ['clean', 'cleaning', 'faxina', 'apartamento'],
  },
  {
    id: 'p4',
    name: 'Keisha Williams',
    profession: 'Braider',
    category: 'beauty',
    languages: ['English'],
    city: 'Boston, MA',
    keywords: ['hair', 'braids', 'beauty', 'salon', 'box braids'],
  },
  {
    id: 'p5',
    name: 'Thiago Mendes',
    profession: 'Barber',
    category: 'beauty',
    languages: ['Portuguese', 'English'],
    city: 'Framingham, MA',
    keywords: ['barber', 'hair', 'corte', 'fade', 'beauty'],
  },
  {
    id: 'p6',
    name: 'Linh Nguyen',
    profession: 'Nail technician',
    category: 'beauty',
    languages: ['Vietnamese', 'English'],
    city: 'Quincy, MA',
    keywords: ['nails', 'manicure', 'beauty', 'salon'],
  },
  {
    id: 'p7',
    name: 'Diego Morales',
    profession: 'Immigration attorney',
    category: 'legal',
    languages: ['Spanish', 'English'],
    city: 'Elizabeth, NJ',
    keywords: ['lawyer', 'attorney', 'immigration', 'visa', 'green card', 'asilo'],
  },
  {
    id: 'p8',
    name: 'Ana Beatriz Costa',
    profession: 'Immigration attorney',
    category: 'legal',
    languages: ['Portuguese', 'English'],
    city: 'Boston, MA',
    keywords: ['lawyer', 'attorney', 'immigration', 'visto', 'green card'],
  },
  {
    id: 'p9',
    name: 'Jean-Pierre Louis',
    profession: 'Immigration attorney',
    category: 'legal',
    languages: ['Haitian Creole', 'French', 'English'],
    city: 'Lynn, MA',
    keywords: ['lawyer', 'attorney', 'immigration', 'tps', 'asylum'],
  },
  {
    id: 'p10',
    name: 'Rafael Souza',
    profession: 'Electrician',
    category: 'trades',
    languages: ['Portuguese', 'English'],
    city: 'Cambridge, MA',
    keywords: ['electrician', 'electrical', 'wiring', 'outlet', 'light'],
  },
  {
    id: 'p11',
    name: 'Omar Hassan',
    profession: 'Plumber',
    category: 'trades',
    languages: ['Arabic', 'English'],
    city: 'Paterson, NJ',
    keywords: ['plumber', 'plumbing', 'leak', 'pipe', 'drain'],
  },
  {
    id: 'p12',
    name: 'Wei Chen',
    profession: 'Painter',
    category: 'trades',
    languages: ['Mandarin', 'English'],
    city: 'Malden, MA',
    keywords: ['painter', 'paint', 'drywall', 'renovation'],
  },
  {
    id: 'p13',
    name: 'Luciana Ferreira',
    profession: 'Private chef',
    category: 'food',
    languages: ['Portuguese', 'English'],
    city: 'Boston, MA',
    keywords: ['chef', 'cook', 'catering', 'food', 'dinner'],
  },
  {
    id: 'p14',
    name: 'Marcus Johnson',
    profession: 'Personal trainer',
    category: 'fitness',
    languages: ['English'],
    city: 'Jersey City, NJ',
    keywords: ['trainer', 'fitness', 'gym', 'workout'],
  },
  {
    id: 'p15',
    name: 'Fatima Diallo',
    profession: 'Personal trainer',
    category: 'fitness',
    languages: ['French', 'English'],
    city: 'Boston, MA',
    keywords: ['trainer', 'fitness', 'gym'],
  },
]
