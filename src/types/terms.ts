export enum Languages {
  ru = 'ru',
  en = 'en',
}

export interface ITerm {
  id: string
  image?: string
  [key: string]: string
}

export interface IMemorizationIds {
  [key: string]: Languages[]
}
