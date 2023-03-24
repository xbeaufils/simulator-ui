import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hl7Response } from '../Hl7Response';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent   {
  
  @Input() messageHl7ToSend: string;
  nomServeur : string;
  port: number;

  constructor( private _snackBar: MatSnackBar, private http: HttpClient) {}

  sendMessage() {
    console.log("Sending ", this.messageHl7ToSend);
    if (this.nomServeur == null) {
      this._snackBar.open("Le nom du serveur est vide", "Annuler");
      return ;
    }
    if (typeof this.nomServeur === "string" &&  this.nomServeur.trim().length == 0) {
      this._snackBar.open("Le nom du serveur est vide", "Annuler");
      return ;
    }
    if (this.port == null) {
      this._snackBar.open("Le port est vide", "Annuler");
      return ;
    }
    this.port = Number(this.port);
    if (isNaN(this.port)) {
      this.port = 0;
      this._snackBar.open("Le port n'est pas valide", "Annuler");   
      return;
    }
    let hl7 = new Hl7Response();
    hl7.message = this.messageHl7ToSend;
    hl7.nomServer = this.nomServeur;
    hl7.port = this.port;
    this.http.post<Hl7Response>("http://localhost:8080/simulator/message/send", hl7)
      .subscribe(data =>{
        console.log(data);
    });

  }
}
