export class HistoryElement{
    public date: Date;
    constructor(public type: 'Translation' | 'Dictionary lookup', public word: string, public results: string){
        this.date = new Date();
    }
}