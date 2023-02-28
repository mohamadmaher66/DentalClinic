import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAuthGaurd } from '../../shared/service/doctorAuthGaurd.service';
import { TreatmentComponent } from './components/treatment/treatment.component';

const routes: Routes = [
  { path:'', component: TreatmentComponent, canActivate:[DoctorAuthGaurd] },
  { path:'treatment', component: TreatmentComponent, canActivate:[DoctorAuthGaurd] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule { }
