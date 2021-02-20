import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './modules/user/components/login/login.component';
import { P404Component } from './views/error/404.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '404', component: P404Component, data: { title: 'Page 404' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  { path: '', component: DefaultLayoutComponent, data: { title: 'Home' },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data:{ title: 'Dashboard'}
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      // App Components
      {
        path: 'medicalhistory',
        loadChildren: () => import('./modules/medical-history/medical-history.module').then(m => m.MedicalHistoryModule) ,
        data:{ title: 'Medical History'}
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) ,
        data:{ title: 'User'}
      },
      {
        path: 'clinic',
        loadChildren: () => import('./modules/clinic/clinic.module').then(m => m.ClinicModule) ,
        data:{ title: 'Clinic'}
      },
      {
        path: 'appointmentaddition',
        loadChildren: () => import('./modules/appointment-addition/appointment-addition.module').then(m => m.AppointmentAdditionModule) ,
        data:{ title: 'Appointment Addition'}
      },
      {
        path: 'appointmentcategory',
        loadChildren: () => import('./modules/appointment-category/appointment-category.module').then(m => m.AppointmentCategoryModule) ,
        data:{ title: 'Appointment Category'}
      },
      {
        path: 'expense',
        loadChildren: () => import('./modules/expense/expense.module').then(m => m.ExpenseModule) ,
        data:{ title: 'Expense'}
      }
    ]
  },
  //{ path: '**', component: P404Component },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
