import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreatmentRoutingModule } from './treatment-routing.module';
import { TreatmentComponent } from './components/treatment/treatment.component';
import { SharedModule } from '../../shared/shared.module';
import { TreatmentDetailsComponent } from './components/treatment-details/treatment-details.component';

@NgModule({
  declarations: [TreatmentComponent, TreatmentDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TreatmentRoutingModule
  ]
})
export class TreatmentModule { }
