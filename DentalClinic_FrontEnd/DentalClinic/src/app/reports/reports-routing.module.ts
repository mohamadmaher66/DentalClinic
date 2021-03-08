import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentReportComponent } from './appointment-report/appointment-report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';

const routes: Routes = [
  { path:'', component: ExpenseReportComponent },
  { path:'expensereport', component: ExpenseReportComponent },
  { path:'appointmentreport', component: AppointmentReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
