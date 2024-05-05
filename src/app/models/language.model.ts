/**
 * Represents a Language structure, which stores one language and its available translation destination languages,
 */
export class Language{
    constructor(public source: string, public destinations: string[]){}
}