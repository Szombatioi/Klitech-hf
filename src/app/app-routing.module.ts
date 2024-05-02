import { NgModule } from '@angular/core';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { HttpCommunicationService } from './services/http-communication.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Route[] = [
  { path: 'translator', component: TranslatorComponent },
  { path: 'dictionary', component: DictionaryComponent},
  { path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [HistoryComponent, TranslatorComponent, DictionaryComponent, NavbarComponent],
  exports: [RouterModule],
  bootstrap: [TranslatorComponent]
})
export class AppRoutingModule { }