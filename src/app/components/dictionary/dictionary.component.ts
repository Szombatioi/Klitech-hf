import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { DictionaryElement } from '../../models/dictionaryElement.model';
import { HistoryService } from '../../services/history.service';
import { HistoryElement } from '../../models/history.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css',
})
export class DictionaryComponent implements OnInit {
  types: Map<string, string> = new Map<string, string>([
    ["Everything", ""],
    ["Definitions", "definitions"],
    ["Synonyms", "synonyms"],
    ["Antonyms", "antonyms"],
    ["Examples", "examples"],
    ["Rhymes", "rhymes"],
    // ["Frequency", "frequency"],
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
    ["Has Attribute", "hasAttribute"],
    ["In Category", "inCategory"],
    ["Has Categories", "hasCategories"],
    ["Also", "also"],
    ["Pertains To", "pertainsTo"],
    ["Similar To", "similarTo"],
    ["Entails", "entails"],
  ]);
  dictionaryElement: DictionaryElement | undefined;
  word: string;
  type: string = "";
  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
      
  }

  getOptions(){
    return Array.from(this.types.keys());
  }

  lookUpWord(){
    this.dictionaryService.getWordInfo(this.word, this.types.get(this.type)).subscribe(
      res => {
        this.dictionaryElement = res;
        if(this.dictionaryElement.results){
          this.dictionaryElement.results.forEach(r => {
            r.definition = r.definition.charAt(0).toUpperCase() + r.definition.slice(1);
          });
        }
        this.dictionaryService.saveHistory(this.word, this.createWordList());
      }
    );
    
  }

  createWordList(){
    return `$Syllables: ${this.dictionaryElement?.syllables}\nFrequency: ${this.dictionaryElement?.frequency}\nPronunciation: ${this.dictionaryElement?.pronunciation}\n`;
  }
}
