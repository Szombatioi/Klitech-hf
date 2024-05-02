import { NgModule } from '@angular/core';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { TranslatorService } from './services/translator.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './main-component/main-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
  { path: 'translator', component: TranslatorComponent },
  { path: 'dictionary', component: DictionaryComponent},
  { path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, FormsModule],
  declarations: [MainComponent, HistoryComponent, TranslatorComponent, DictionaryComponent, NavbarComponent],
  exports: [RouterModule],
  bootstrap: [MainComponent]
})
export class AppRoutingModule { }