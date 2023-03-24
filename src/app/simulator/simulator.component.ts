import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent {

  hl7Message : string;
  
  send($event: string) { 
    this.hl7Message = $event; 
    console.log("simul ", this.hl7Message );
  }


  constructor(private breakpointObserver: BreakpointObserver) {}
}
