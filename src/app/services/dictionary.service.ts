import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DictionaryElement } from '../models/dictionaryElement.model';
import { EMPTY, Observable, catchError } from 'rxjs';
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

  public types = new Map<string, string>([
    ["Everything", ""],
    ["Definitions", "definitions"],
    ["Synonyms", "synonyms"],
    ["Antonyms", "antonyms"],
    ["Examples", "examples"],
    ["Rhymes", "rhymes"],
    ["Is A Type Of", "typeOf"],
    ["Has Types", "hasTypes"],
    ["Part Of", "partOf"],
    ["Has Parts", "hasParts"],
    ["Is An Instance Of", "instanceOf"],
    ["Has Instances", "hasInstances"],
    ["In Region", "inRegion"],
    ["Region Of", "regionOf"],
    ["Usage Of", "usageOf"],
    ["Has Usages", "hasUsages"],
    ["Is A Member Of", "memberOf"],
    ["Has Members", "hasMembers"],
    ["Is A Substance Of", "substanceOf"],
    ["Has Substances", "hasSubstances"],
    ["In Category", "inCategory"],
    ["Has Categories", "hasCategories"],
    ["Also", "also"],
    ["Pertains To", "pertainsTo"],
    ["Similar To", "similarTo"],
    ["Entails", "entails"],
  ]);

  constructor(private historyService: HistoryService, private http: HttpClient) {}
  
  public getWordInfo(word: string, type: string = "") : Observable<DictionaryElement>{
    return this.http.get<DictionaryElement>(`https://wordsapiv1.p.rapidapi.com/words/${word}${type === "" ? "" : "/"+type}`, this.options).pipe(
      catchError(e => {return EMPTY;})
    );
  }

  saveHistory(word: string, result: string[]){
    this.historyService.saveHistory(new HistoryElement(
      "Dictionary lookup",
      word,
      result,
    ));
  }
}
