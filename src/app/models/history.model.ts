/**
 * Represents a structure that is represented in the History page.
 * It stores when the history was created, its type, the word in question and its results.
 */
export class HistoryElement{
    public date: Date;
    constructor(public type: 'Translation' | 'Dictionary lookup', public word: string, public results: string[]){
        this.date = new Date();
    }
}