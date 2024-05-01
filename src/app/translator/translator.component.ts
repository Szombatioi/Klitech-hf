import { Component } from '@angular/core';
import { Languages } from '../models/languages.model';
import { Observable } from 'rxjs';
import { HttpCommunicationService } from '../services/http-communication.service';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.css',
  providers: [HttpCommunicationService]
})
export class TranslatorComponent {
  languages: Languages[] | undefined;
  constructor(private http: HttpCommunicationService){
    console.log("?");
  }
  
  ngOnInit(){
    this.languages = this.http.getLanguages();
  }
}
