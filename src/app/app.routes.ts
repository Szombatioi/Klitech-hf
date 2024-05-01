import { Routes } from '@angular/router';
import { TranslatorComponent } from './translator/translator.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
    { path: 'translator', component: TranslatorComponent },
    { path: 'dictionary', component: DictionaryComponent},
    { path: 'history', component: HistoryComponent}
];
