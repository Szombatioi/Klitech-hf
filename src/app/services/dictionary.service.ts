import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DictionaryElement } from '../models/dictionaryElement.model';
import { Observable } from 'rxjs';
import { HistoryService } from './history.service';
import { HistoryElement } from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private options = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': '598eb041d4mshec7f369d26065e3p1c07afjsn8614274e5605',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    })
  };

  constructor(private historyService: HistoryService, private http: HttpClient) {}

  public getWordInfo(word: string, type: string = "") : Observable<DictionaryElement>{
    return this.http.get<DictionaryElement>(`https://wordsapiv1.p.rapidapi.com/words/${word}${type ? "/"+type : ""}`, this.options);
  }

  saveHistory(word: string, result: string){
    this.historyService.saveHistory(new HistoryElement(
      "Dictionary lookup",
      word,
      result,
    ));
  }
}
