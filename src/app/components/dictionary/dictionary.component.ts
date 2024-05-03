import { Component } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { DictionaryElement } from '../../models/dictionaryElement.model';
import { HistoryService } from '../../services/history.service';
import { HistoryElement } from '../../models/history.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css',
})
export class DictionaryComponent {
  types: string[] = [
    "Everything",
    "Definitions",
    "Synonyms",
    "Antonyms",
    "Examples",
    "Rhymes",
    "Frequency",
    "Is A Type Of",
    "Has Types",
    "Part Of",
    "Has Parts",
    "Is An Instance Of",
    "Has Instances",
    "In Region",
    "Region Of",
    "Usage Of",
    "Has Usages",
    "Is A Member Of",
    "Has Members",
    "Is A Substance Of",
    "Has Substances",
    "Has Attribute",
    "In Category",
    "Has Categories",
    "Also",
    "Pertains To",
    "Similar To",
    "Entails",
  ];
  dictionaryElement: DictionaryElement;
  word: string = '';
  constructor(private historyService: HistoryService, private dictionaryService: DictionaryService) {}
  

  lookUpWord(){
    this.dictionaryService.getWordInfo(this.word).subscribe(
      res => {
        this.dictionaryElement = res;
        this.dictionaryElement.results.forEach(r => {
          r.definition = r.definition.charAt(0).toUpperCase() + r.definition.slice(1);
        });

        this.historyService.saveHistory(new HistoryElement(
          "Dictionary lookup",
          this.word,
          [res.results[0].definition],
        ));
      }
    );
    
  }
}
