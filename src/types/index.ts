export interface User {
  tempId: string
  login: string
  password: string | null
  type: string
  marks: Mark[]
}

export interface Mark {
  text: string
}
