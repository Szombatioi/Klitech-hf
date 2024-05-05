import { Language } from "./language.model";

/**
 * Represents a storage for the available translation languages and their available destination languages.
 */
export class Languages{
    constructor(public languages: Language[]){}

    /**
     * Returns the destination languages for the given language.
     * @param lang The selected language.
     * @returns The available destination languages.
     */
    getDestinationsFor(lang: string) : string[] | undefined{
        return this.languages.find(l => l.source === lang)?.destinations;
    }

    /**
     * Checks wether the given language is available in the API.
     * @param lang The language in question.
     * @returns Returns true if the language is available, otherwise false.
     */
    languageExists(lang: string) : boolean{
        return this.languages.find(l => l.source === lang) !== undefined;
    }
}