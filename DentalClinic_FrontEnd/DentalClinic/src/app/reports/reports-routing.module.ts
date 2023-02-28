import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAuthGaurd } from '../shared/service/doctorAuthGaurd.service';
import { AppointmentReportComponent } from './appointment-report/appointment-report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { TotalExpenseReportComponent } from './total-expense-report/total-expense-report.component';

const routes: Routes = [
  { path:'', component: ExpenseReportComponent },
  { path:'expensereport', component: ExpenseReportComponent, data:{ title: ' Expenses Report'}, canActivate:[DoctorAuthGaurd]  },
  { path:'appointmentreport', component: AppointmentReportComponent, data:{ title: ' Appointments Report'}, canActivate:[DoctorAuthGaurd]  },
  { path:'totalexpensereport', component: TotalExpenseReportComponent, data:{ title: 'Total Expenses Report'}, canActivate:[DoctorAuthGaurd] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
