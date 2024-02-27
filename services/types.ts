export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Adress,
  phone: string,
  website: string,
  company: Company
}

export interface Adress {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Coordinates
}

export interface Coordinates {
  lat: number,
  lng: number
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface Album {
  userId: number,
  id: number,
  title: string
}

export interface UserAlbums {
  title: string,
  data: Album[]
}

export interface HeaderType {
}

export interface Photo {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string,
}