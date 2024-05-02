import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCommunicationService } from '../../services/http-communication.service';
import { Languages } from '../../models/languages.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'translator',
  templateUrl: './translator.component.html',
  providers: [HttpCommunicationService]
})
export class TranslatorComponent implements OnInit{
  // languages: Languages[] | undefined;
  // constructor(private http: HttpCommunicationService){
  //   console.log("?");
  // }
  
  ngOnInit(){
    // this.languages = this.http.getLanguages();
  }
}
