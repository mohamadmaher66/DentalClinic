import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseReportComponent } from './expense-report/expense-report.component';

const routes: Routes = [
  { path:'', component: ExpenseReportComponent },
  { path:'expensereport', component: ExpenseReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
