import { Language } from "./language.model";

export class Languages{
    constructor(public languages: Language[]){}

    getDestinationsFor(lang: string) : string[] | undefined{
        return this.languages.find(l => l.source === lang)?.destinations;
    }

    languageExists(lang: string) : boolean{
        return this.languages.find(l => l.source === lang) !== undefined;
    }
}