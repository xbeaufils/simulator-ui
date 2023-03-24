import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Hl7Response } from '../Hl7Response';
import { Intervention } from '../intervention';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-hl7-message',
  templateUrl: './hl7-message.component.html',
  styleUrls: ['./hl7-message.component.css']
})
export class HL7MessageComponent implements OnInit{
  intervention : Intervention;
  dateNaissance : moment.Moment;
  dateOpe: moment.Moment;
  messageHL7: string;

  @Output() msgToSender = new EventEmitter<any>();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.intervention = new Intervention();
    this.dateOpe = moment();
    this.intervention.heureOpe = moment().format('HH:mm');
  }

  buildMessage() {
    console.log("Intervention " + this.intervention);
    if (!  moment(this.dateNaissance, "DD/MM/YYYY", true).isValid() ) {
      this._snackBar.open("Date de naissance invalide", "Annuler");
      return;
    }
    this.intervention.datenaissance = this.dateNaissance.format('DD/MM/YYYY') + " 00:00:00";
    
    if (! moment(this.dateOpe, "DD/MM/YYYY", true).isValid()) {
      this._snackBar.open("Date d'opération invalide", "Annuler");
      return;
    }
    this.intervention.dateOpe = this.dateOpe.format("DD/MM/YYYY");
    this.intervention.dateOpe += " " + this.intervention.heureOpe + ":00";
    
    this.http.post<Hl7Response>("http://localhost:8080/simulator/message/build", this.intervention)
      .subscribe(data =>{
        console.log(data);
        this.msgToSender.emit(data.message);
      }
    );
  }
}
