import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Language } from '../models/language.model';
import { catchError, map } from 'rxjs/operators';
import { Languages } from '../models/languages.model';
import { TranslatorResult } from '../models/translatorResult.model';
import { HistoryService } from './history.service';
import { HistoryElement } from '../models/history.model';


@Injectable({providedIn: 'root'})
export class TranslatorService {
  /**
   * API key for the Yandex dictionary API. (https://yandex.com/dev/dictionary/)
   */
  private API_key: string = "dict.1.1.20240501T113006Z.b74d50b389299474.1a4aa48b11edb7e6d89d2838e22e28bb70abf79a";

  /**
   * Link for the root of the API.
   */
  private API_link: string = "https://dictionary.yandex.net/api/v1/dicservice.json/";

  constructor(private http: HttpClient, private historyService: HistoryService) { }

  /**
   * Map that maps language abbreviations to their fully qualified name.
   * Since Yandex provides the languages in such format we need to map these names.
   */
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

  /**
   * Retrieves the available languages and each supported destination for them.
   * 
   * @returns An Observable of the type Languages. Needs to be subscribed to where it is called.
   */
  getLanguages(): Observable<Languages>{
    return this.http.get<string[]>(`${this.API_link}getLangs?key=${this.API_key}`).pipe(
      map((languagePairs: string[]) => {
        const languageMap = new Map<string, string[]>();
        //Takes each language pair (e.g. "en-ru"), splits them at the first occurance of the separator ('-') and stores the source-destination pairs.
        languagePairs.forEach(pair => {
          
          //There's always at least one separator, so we do not need to check that
          const indexOfSeparator = pair.indexOf('-'); 
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

  /**
   * Translates a word from a source language to a destination language.
   * API errors are not checked here, so the caller function needs to check for errors. (e.g. no translation available)
   * @param word The word we would like to translate
   * @param from The source language
   * @param to The destination language
   * @returns Return a TranslatorResult, which contains definitions, synonyms and the actual translation. We only use the translation, since we use WordsAPI for the others.
   */
  translate(word: string, from: string, to: string) : Observable<TranslatorResult> {
    return this.http.get<TranslatorResult>(`${this.API_link}lookup?key=${this.API_key}&lang=${from}-${to}&text=${word}`);
  }

  /**
   * Saves a successful translation so the user can find it later in the History page
   * @param word The word that was translated
   * @param result Source, destination languages and the translation(s)
   */
  saveHistory(word: string, result: string){
    this.historyService.saveHistory(new HistoryElement(
      "Translation",
      word,
      [result],
    ));
  }
}
