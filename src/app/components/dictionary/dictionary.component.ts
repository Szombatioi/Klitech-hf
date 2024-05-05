import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { DictionaryElement } from '../../models/dictionaryElement.model';
import { HistoryService } from '../../services/history.service';
import { HistoryElement } from '../../models/history.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css',
})
export class DictionaryComponent implements OnInit {
  /**
   * The available types for lookup.
   */
  types: Map<string, string>;
  /**
   * The result of a lookup.
   */
  dictionaryElement: DictionaryElement | undefined;
  /**
   * The word we want to search. Binded with the <input> element.
   */
  word: string;
  /**
   * The type of the lookup. Binded with the <select> element.
   */
  type: string = "Everything";
  isLoadingStage = true;
  constructor(private dictionaryService: DictionaryService, private snack: MatSnackBar) {}

  ngOnInit(): void {
      this.types = this.dictionaryService.types;
      this.isLoadingStage = false;
  }

  /**
   * This method returns the array of the available types' keys. We may use this function for the <select> element's <option> fields.
   * @returns Returns the array of the lookup type names.
   */
  getOptions(){
    return Array.from(this.types.keys());
  }

  /**
   * The method calls the service to lookup the binded word with the binded type.
   */
  lookUpWord(){
    //Checking inputs. If any of them are wrong, we open a snackbar.
    if(this.word === "" || this.word === undefined || this.type === undefined || this.type === ""){
      this.snack.open("Invalid inputs!", "Ok");
      return;      
    }

    this.dictionaryService.getWordInfo(this.word, this.types.get(this.type))
      .pipe(catchError(e => {
        this.snack.open("No result!", "Ok");
        return EMPTY;
      }))
      .subscribe(
        res => {
          this.dictionaryElement = res;
          //If there are results, we take each definition and turn their first character uppercase, since the results come with a lowercase first character.
          if(this.dictionaryElement.results){
            this.dictionaryElement.results.forEach(r => {
              r.definition = r.definition.charAt(0).toUpperCase() + r.definition.slice(1);
            });
          }
          //Finally we save the history.
          this.dictionaryService.saveHistory(`${this.word} (${this.type})`, this.createWordList());
        }
      );
  }

  /**
   * This method is used when we save a history element.
   * We iterate through each property of the given result and append the results with their content.
   * @returns Return the formatted result of the dictionary element.
   */
  createWordList(){
    let result: string[] = [];
    if(this.dictionaryElement!.syllables){
      result.push(`Syllables: ${this.dictionaryElement!.syllables.list.join(",")}\n`);
    }
    if(this.dictionaryElement!.pronunciation){
      result.push(`Pronunciation: ${this.dictionaryElement!.pronunciation.all}` + "\n");
    }
    if(this.dictionaryElement!.frequency){
      result.push(`Pronunciation: ${this.dictionaryElement!.frequency}` + "\n");
    }
    if(this.dictionaryElement!.definitions){
      for(let d of this.dictionaryElement!.definitions){
        result.push(`Definition: ${d.definition}, part of speech: ${d.partOfSpeech}` + "\n");
      }
    }
    if(this.dictionaryElement!.rhymes){
      result.push(`Rhymes: ${this.dictionaryElement!.rhymes.all.join(",")}` + "\n");
    }

    for(let prop in this.dictionaryElement){
      const p = (this.dictionaryElement as any)[prop];
      if(this.dictionaryElement.hasOwnProperty(prop) && p && 
        Array.isArray(p) && p.every(item => typeof item === "string")){
          result.push(p.length > 0 ? `${prop}: ${p.join(",")}` + "\n" : "No results.");
      }
    }
    return result;
  }
}
