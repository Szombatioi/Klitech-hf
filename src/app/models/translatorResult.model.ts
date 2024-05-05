/**
 * These models were converted from the Yandex API's json response using https://transform.tools/json-to-typescript
 */

export interface TranslatorResult {
    head: Head
    def: Def[]
}
  
export interface Head {}

export interface Def {
    text: string
    pos: string
    ts: string
    tr: Tr[]
}

export interface Tr {
    text: string
    pos: string
    asp?: string
    fr: number
    syn?: Syn[]
    mean: Mean[]
    gen?: string
}

export interface Syn {
    text: string
    pos: string
    asp?: string
    fr: number
    gen?: string
}

export interface Mean {
    text: string
}