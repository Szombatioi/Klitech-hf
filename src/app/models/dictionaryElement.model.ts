/**
 * These models were converted from the WordsAPI API's json response using https://transform.tools/json-to-typescript and was extended for the various endpoints.
 */

export interface DictionaryElement{
    word: string
    results?: Result[]
    syllables?: Syllables
    pronunciation?: Pronunciation
    frequency?: number

    definitions?: Result[]
    rhymes?: Rhyme
    synonyms?: string[]
    antonyms?: string[]
    examples?: string[]
    typeOf?: string[]
    hasTypes?: string[]
    partOf?: string[]
    hasParts?: string[]
    instanceOf?: string[]
    hasInstances?: string[]
    inRegion?: string[]
    regionOf?: string[]
    usageOf?: string[]
    hasUsages?: string[]
    memberOf?: string[]
    hasMembers?: string[]
    substanceOf?: string[]
    hasSubstances?: string[]
    hasAttribute?: string[]
    inCategory?: string[]
    hasCategories?: string[]
    also?: string[]
    pertainsTo?: string[]
    similarTo?: string[]
    entails?: string[]
    derivation?: string[]
}

export interface Result {
    definition: string
    partOfSpeech: string
    synonyms?: string[]
    antonyms?: string[]
    examples?: string[]
    rhymes?: string[]
    typeOf?: string[]
    hasTypes?: string[]
    partOf?: string[]
    hasParts?: string[]
    instanceOf?: string[]
    hasInstances?: string[]
    inRegion?: string[]
    regionOf?: string[]
    usageOf?: string[]
    hasUsages?: string[]
    memberOf?: string[]
    hasMembers?: string[]
    substanceOf?: string[]
    hasSubstances?: string[]
    hasAttribute?: string[]
    inCategory?: string[]
    hasCategories?: string[]
    also?: string[]
    pertainsTo?: string[]
    similarTo?: string[]
    entails?: string[]
    derivation?: string[]
}

export interface Syllables {
    count: number
    list: string[]
}

export interface Pronunciation {
    all: string
}

export interface Rhyme{
    all: string[]
}