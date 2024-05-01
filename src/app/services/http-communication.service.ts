import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Languages } from '../models/languages.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpCommunicationService {
  private API_key: string = "dict.1.1.20240501T113006Z.b74d50b389299474.1a4aa48b11edb7e6d89d2838e22e28bb70abf79a";
  constructor(private http: HttpClient) { }

  getLanguages(): Languages[]{
    let res: Languages[] = [];
    this.http.get<string[]>(`https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.API_key}`).subscribe(
      str => {
        res = str.map(
          s => {
            const [source, dest] = s.split('-');
            return {source: source, destination: dest} as Languages
          }
        )
      }
    );
    return res;
    // return this.http.get<string[]>(`https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.API_key}`).pipe(
    //   map((strings: string[]) => {
    //     return strings.map(s => {
    //       const [source, destination] = s.split('-');
    //       console.log(`${source} - ${destination}`);
    //       return { source, destination } as Languages;
    //     })
    //   }));
  }
}
