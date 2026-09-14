import { media } from '../lib/media'

export type RoomListing = {
  id: string
  title: string
  type: string
  city: string
  rent: string
  deposit: string
  miles: string
  photo: string
}

export const ROOMS: RoomListing[] = [
  {
    id: 'r1',
    title: 'Furnished room in Somerville',
    type: 'Room',
    city: 'Somerville, MA',
    rent: '$1,150/mo',
    deposit: '1 month',
    miles: '0.9 mi',
    photo: media.serviceRoom,
  },
  {
    id: 'r2',
    title: 'Bright room near the T',
    type: 'Room',
    city: 'Allston, MA',
    rent: '$980/mo',
    deposit: '1 month',
    miles: '1.6 mi',
    photo: media.serviceHousing,
  },
  {
    id: 'r3',
    title: 'Studio, two months max',
    type: 'Studio',
    city: 'Jersey City, NJ',
    rent: '$1,420/mo',
    deposit: '2 months',
    miles: '2.4 mi',
    photo: media.howHouse,
  },
]
