import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslatorService } from '../../services/translator.service';
import { Language } from '../../models/language.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { Languages } from '../../models/languages.model';
import { HistoryService } from '../../services/history.service';
import { HistoryElement } from '../../models/history.model';

@Component({
  selector: 'translator',
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.css',
  providers: [TranslatorService]
})
export class TranslatorComponent implements OnInit{
  constructor(private historyService: HistoryService, private translatorService: TranslatorService){
    this.fullLanguageNames = this.translatorService.languageMap;
  }

  ngOnInit() : void{
    this.languages = this.translatorService.getLanguages();
    this.languages.subscribe(languages => {
      this.selectedSource = languages.languages[0].source;
      this.selectableDestinations = languages.getDestinationsFor(this.selectedSource)!;
      this.selectedDestination = this.selectableDestinations[0];
    });
  }
  
  languages: Observable<Languages>;
  fullLanguageNames: Map<string, string>;
  selectedSource: string;
  selectedDestination: string;
  selectableDestinations: string[];
  word: string;
  result: string;
  
  getLanguageName(l: string){
    return this.fullLanguageNames.get(l);
  }

  translateWordTo(){
    this.translatorService.translate(this.word, this.selectedSource, this.selectedDestination).subscribe(
      res => {
        this.result = res.def[0].tr[0].text;
        this.historyService.saveHistory(new HistoryElement(
          "Translation",
          this.word,
          [res.def[0].tr[0].text],
        ));
      }
    );
  }

  selectChanged(){
    this.languages.subscribe(
      languages => {
        this.selectableDestinations = languages.getDestinationsFor(this.selectedSource)!;
        this.selectedDestination = this.selectableDestinations[0];
      }
    );
  }
}
