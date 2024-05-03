import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { HistoryElement } from '../../models/history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit{
  historyElements: HistoryElement[] = [];
  constructor(private historyService: HistoryService){}

  ngOnInit(): void {
    this.historyElements = this.historyService.loadHistory();
  }

  deleteHistory(historyElement: HistoryElement){
    this.historyService.deleteHistoryElement(historyElement);
  }

  clearHistory() { 
    this.historyService.clearHistory();
   }
}
