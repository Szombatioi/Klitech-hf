import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Language } from '../models/language.model';
import { catchError, map } from 'rxjs/operators';
import { Languages } from '../models/languages.model';
import { TranslatorResult } from '../models/translatorResult.model';


@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private API_key: string = "dict.1.1.20240501T113006Z.b74d50b389299474.1a4aa48b11edb7e6d89d2838e22e28bb70abf79a";
  constructor(private http: HttpClient) { }

  public languageMap: Map<string, string> = new Map<string, string>([
    ["be", "Belarusian"],
    ["bg", "Bulgarian"],
    ["cs", "Czech"],
    ["da", "Danish"],
    ["de", "German"],
    ["el", "Greek"],
    ["emj", "Early Middle Japanese"],
    ["en", "English"],
    ["es", "Spanish"],
    ["et", "Estonian"],
    ["fi", "Finnish"],
    ["fr", "French"],
    ["hu", "Hungarian"],
    ["it", "Italian"],
    ["lt", "Lithuanian"],
    ["lv", "Latvian"],
    ["mhr", "Eastern Mari"],
    ["mrj", "Western Mari"],
    ["nl", "Dutch"],
    ["no", "Norwegian"],
    ["pl", "Polish"],
    ["pt", "Portuguese"],
    ["pt-BR", "Brazilian Portuguese"],
    ["ru", "Russian"],
    ["sk", "Slovak"],
    ["sv", "Swedish"],
    ["tr", "Turkish"],
    ["tt", "Tatar"],
    ["uk", "Ukrainian"],
    ["zh", "Chinese"],
  ]);
  getLanguages(): Observable<Languages>{
    return this.http.get<string[]>(`https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.API_key}`).pipe(
      map((languagePairs: string[]) => {
        const languageMap = new Map<string, string[]>();
        languagePairs.forEach(pair => {
          
          const indexOfSeparator = pair.indexOf('-'); //mindig van benne legalább 1!
          const [source, destination] = [pair.substring(0, indexOfSeparator), pair.substring(indexOfSeparator+1)];
          if (!languageMap.has(source)) {
            languageMap.set(source, []);
          }
          const destinations = languageMap.get(source);
          if (destinations) {
            destinations.push(destination);
          }
        });
        const languages: Language[] = [];
        languageMap.forEach((destinations, source) => {
          languages.push(new Language(source, destinations));
        });
        return new Languages(languages);
      })
    );
  }

  translate(word: string, from: string, to: string) : Observable<TranslatorResult> {
    return this.http.get<TranslatorResult>(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${this.API_key}&lang=${from}-${to}&text=${word}`);
  }
}
