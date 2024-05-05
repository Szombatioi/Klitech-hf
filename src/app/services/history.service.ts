import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryElement } from '../models/history.model';

@Injectable({providedIn: 'root'})
export class HistoryService {
  /**
   * The array of stored history elements represented in the History page.
   * The array is retrieved from the Localstorage.
   */
  historyElements: HistoryElement[] = [];

  /**
   * This is at which key are the history elements are stored in the Localstorage.
   */
  private localstorage_key = "stored_items";

  constructor(){
    this._loadHistory().subscribe(res => {
      this.historyElements = res;
    });
  }

  /**
   * Saves a history to both the Localstorage and the array of history elements.
   * @param element The element we want to store.
   */
  saveHistory(element: HistoryElement){
    this.historyElements.push(element);
    this.saveStorage();
  }

  /**
   * Updates the localstorage with the new array of history elements.
   */
  private saveStorage(){
    localStorage.removeItem(this.localstorage_key);
    const json = JSON.stringify(this.historyElements);
    localStorage.setItem("stored_items", json);
  }

  /**
   * Loads the array from the Localstorage.
   * @returns The array filled with history elements.
   */
  loadHistory() : HistoryElement[]{
    return this.historyElements;
  }

  /**
   * Deletes one history element from the array.
   * The .splice() function solves the problem if the provided history element is not in the list, by just keeping the array as it was.
   * @param historyElement The element we want to remove from the list.
   */
  deleteHistoryElement(historyElement: HistoryElement){
    this.historyElements.splice(this.historyElements.indexOf(historyElement), 1);
    this.saveStorage();
  }

  /**
   * Used to load the history on load.
   * @param key The key at where we store the array in the Localstorage.
   * @returns Returns an Observable with the array.
   */
  private _loadHistory(key: string = this.localstorage_key) : Observable<HistoryElement[]>{
    return new Observable(o => {
      const json = localStorage.getItem(key);
      if(json) o.next(JSON.parse(json));
      
      //we won't throw errors otherwise, since it is not an error if there's no previously saved array.
      else o.next([]);
      o.complete();
    });
  }

  /**
   * Deletes all history elements.
   */
  clearHistory(){
    localStorage.removeItem(this.localstorage_key);
    this.historyElements = [];
  }
}
