import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { TranslatorComponent } from './translator/translator.component';

const routes: Routes = [
  { path: 'translator', component: TranslatorComponent },
    { path: 'dictionary', component: DictionaryComponent},
    { path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }