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
  types: Map<string, string>;
  dictionaryElement: DictionaryElement | undefined;
  word: string;
  type: string = "Everything";
  isLoadingStage = true;
  constructor(private dictionaryService: DictionaryService, private snack: MatSnackBar) {}

  ngOnInit(): void {
      this.types = this.dictionaryService.types;
      this.isLoadingStage = false;
  }

  getOptions(){
    return Array.from(this.types.keys());
  }

  lookUpWord(){
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
          if(this.dictionaryElement.results){
            this.dictionaryElement.results.forEach(r => {
              r.definition = r.definition.charAt(0).toUpperCase() + r.definition.slice(1);
            });
          }
          this.dictionaryService.saveHistory(`${this.word} (${this.type})`, this.createWordList());
        }
      );
  }

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
