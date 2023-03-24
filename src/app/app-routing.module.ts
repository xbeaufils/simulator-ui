import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HL7MessageComponent } from './hl7-message/hl7-message.component';
import { SimulatorComponent } from './simulator/simulator.component';

const routes: Routes = [
  { path: 'hl7', component: HL7MessageComponent},
  { path: 'simu', component: SimulatorComponent},
  { path: '',   redirectTo: '/simu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
