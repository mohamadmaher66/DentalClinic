// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';

// navbars
import { NavbarsComponent } from './navbars/navbars.component';
// Components Routing
import { BaseRoutingModule } from './base-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    CollapseModule.forRoot()
  ],
  declarations: [
    NavbarsComponent
  ]
})
export class BaseModule { }
