import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { HistoryElement } from '../../models/history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit{
  /**
   * The array of history elements that are represented on this page.
   */
  historyElements: HistoryElement[] = [];
  isLoadingStage = true;
  constructor(private historyService: HistoryService){}

  /**
   * After the databindings are finished, we load the history.
   */
  ngOnInit(): void {
    this.historyElements = this.historyService.loadHistory();
    this.isLoadingStage = false;
  }

  /**
   * This method deletes one specific element from the history. The function forwards the action to the service.
   * @param historyElement The element that we want to delete.
   */
  deleteHistory(historyElement: HistoryElement){
    this.historyService.deleteHistoryElement(historyElement);
  }

  /**
   * Clearing the whole history. The function forwards the action to the service.
   */
  clearHistory() { 
    this.historyService.clearHistory();
    this.historyElements = [];
  }

  /**
   * This method is used to format the given history element's date to the local format.
   * @param d The history element's date.
   * @returns Returns the formatted date.
   */
  formatDate(d: Date): string{
    return new Date(d).toLocaleDateString();
  }
}
