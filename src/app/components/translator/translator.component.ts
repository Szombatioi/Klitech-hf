import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslatorService } from '../../services/translator.service';
import { Language } from '../../models/language.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { Languages } from '../../models/languages.model';

@Component({
  selector: 'translator',
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.css',
  providers: [TranslatorService]
})
export class TranslatorComponent implements OnInit{
  constructor(private translatorService: TranslatorService){
    this.fullLanguageNames = this.translatorService.languageMap;
  }

  ngOnInit() : void{
    this.languages = this.translatorService.getLanguages();
    this.languages.subscribe(
      langs => {
        this.selectedSource = langs.languages[0];
        this.selectedDestination = langs.languages[0];
      }
    )
  }
  
  languages: Observable<Languages>;
  fullLanguageNames: Map<string, string>;
  selectedSource: Language;
  selectedDestination: Language;

  
  getLanguageName(l: string){
    return this.fullLanguageNames.get(l);
  }

  translateWordTo(){

  }
  // selectChanged(lang: Language){
    
  // }
}
