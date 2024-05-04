import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryElement } from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  historyElements: HistoryElement[] = [];
  private localstorage_key = "stored_items";

  constructor(){
    this._loadHistory().subscribe(res => {
      this.historyElements = res;
      console.log(this.historyElements);
    });
  }

  saveHistory(element: HistoryElement){
    this.historyElements.push(element);
    this.saveStorage();
    console.log("History Element saved");
  }

  private saveStorage(){
    localStorage.removeItem(this.localstorage_key);
    const json = JSON.stringify(this.historyElements);
    localStorage.setItem("stored_items", json);
  }

  loadHistory() : HistoryElement[]{
    return this.historyElements;
  }

  deleteHistoryElement(historyElement: HistoryElement){
    this.historyElements.splice(this.historyElements.indexOf(historyElement), 1);
    this.saveStorage();
  }

  private _loadHistory(key: string = this.localstorage_key) : Observable<HistoryElement[]>{
    return new Observable(o => {
      const json = localStorage.getItem(key);
      if(json) o.next(JSON.parse(json));
      else o.next([]); //nem akarjuk hibaként kezelni, ha üres
      o.complete();
    });
  }

  clearHistory(){
    localStorage.removeItem(this.localstorage_key);
    this.historyElements = [];
  }
}
