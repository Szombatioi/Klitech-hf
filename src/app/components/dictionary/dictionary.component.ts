import { Component } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
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
  constructor(private dictionaryService: DictionaryService) {
    this.dictionaryService.getWordInfo("example");
  }
}
