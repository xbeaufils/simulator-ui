import { Time } from "@angular/common";

export class Intervention {
    ordre : string;
    patientId: number;
    nom: string;
    prenom: string;
    datenaissance : string;
    sex : string;
    opeId: number;
    lieu: string;
    description: string;
    doctor: string;
    dateOpe : string;
    heureOpe : string;
}

export class MessageDto {
    message : string;
}