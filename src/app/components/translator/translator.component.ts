import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TranslatorService } from '../../services/translator.service';
import { Language } from '../../models/language.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { Languages } from '../../models/languages.model';
import { HistoryService } from '../../services/history.service';
import { HistoryElement } from '../../models/history.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Tr } from '../../models/translatorResult.model';

@Component({
  selector: 'translator',
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.css',
  providers: [TranslatorService]
})
export class TranslatorComponent implements OnInit{
  constructor(private translatorService: TranslatorService, private snack: MatSnackBar){
    this.fullLanguageNames = this.translatorService.languageMap;
  }

  /**
   * When the bindings are finished, we load the available languages and set the source and destination options to be something existing, not just an empty box.
   */
  ngOnInit() : void{
    this.languages = this.translatorService.getLanguages();
    this.languages.subscribe(languages => {
      this.selectedSource = languages.languages[0].source;
      this.selectableDestinations = languages.getDestinationsFor(this.selectedSource)!;
      this.selectedDestination = this.selectableDestinations[0];
      this.isLoadingStage = false;
    });
  }
  
  isLoadingStage = true;
  /**
   * The languages that stores the available languages and their destinations
   */
  languages: Observable<Languages>;
  /**
   * A map that maps abbreviated languages to their fully qualified names.
   */
  fullLanguageNames: Map<string, string>;
  /**
   * The selected source language selected with the first <select> element.
   */
  selectedSource: string;
  /**
   * The selected destination language selected with the second <select> element.
   * Binded with the first <select> element.
   */
  selectedDestination: string;

  /**
   * The list of available destination languages for the selected language.
   * Binded with the second <select> element.
   */
  selectableDestinations: string[];

  /**
   * The word that we will translate.
   * Binded with the first <textarea> element.
   */
  word: string;

  /**
   * The result of the translation.
   * Binded with the second <textarea> element.
   */
  result: string;

  /**
   * If a word has multiple translations, this array will store them.
   */
  alternatives: string[];
  
  /**
   * @param l The abbreviated version of the word.
   * @returns Returns the fully qualified name of the language based on the abbreviation.
   */
  getLanguageName(l: string){
    return this.fullLanguageNames.get(l);
  }

  /**
   * Translates a word from the source language to the destination language.
   * The function uses the databindings mentioned above.
   */
  translateWord(){
    //Checking the inputs, if any of them is incorrect, we make a snackbar.
    if(this.word === "" || this.word === undefined || this.selectedSource === undefined || this.selectedDestination === undefined || this.word.split(' ').length > 1){
      this.snack.open("Invalid inputs!", "Ok");
      return;
    }
    this.alternatives = [];
    this.translatorService.translate(this.word, this.selectedSource, this.selectedDestination).pipe(
      catchError((e) => {
        this.snack.open("API Error!", "Ok");
        return throwError(e);
      })
    ).subscribe(
      res => {
        //Checking if the word has any translations.
        if(res.def.length === 0){
          this.snack.open("No translation available!", "Ok");
          this.result = "¯\\_(ツ)_/¯";
          return;
        }
        //The result is stored in the 0th definition element, inside that in the 0th tr (translation) element.
        this.result = res.def[0].tr[0].text;
        //The alternatives are stored in the other elements of the tr elements.
        this.alternatives = res.def[0].tr.slice(1).map(t => t.text);
        //Finally, we store the translation as history element.
        this.translatorService.saveHistory(this.word, `${this.selectedSource}-${this.selectedDestination} → ${this.createWordList(res.def[0].tr)}`);
      }
    );
  }

  /**
   * This method is responsible for creating a word list of the translation results. We may use this method when we save a history element.
   * @param tr The translations' array.
   * @returns Returns an string, joining the results with comma separation.
   */
  private createWordList(tr: Tr[]): string{
    let arr: string[] = [];
    for(let t of tr) arr.push(t.text);
    return arr.join(",");
  }

  /**
   * When the first <select> element is changed, we modify the options for the second <select> element, to retrieve the available destinations for that specific language.
   */
  selectChanged(){
    this.languages.subscribe(
      languages => {
        this.selectableDestinations = languages.getDestinationsFor(this.selectedSource)!;
        this.selectedDestination = this.selectableDestinations[0];
      }
    );
  }
}
