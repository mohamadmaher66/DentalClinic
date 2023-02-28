import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Treatment } from '../../../../core/models/treatment.model';
import { TreatmentService } from '../../../../core/servcies/treatment.service';
import { RequestedData } from '../../../../shared/models/request-data.entity';
import { AlertService } from '../../../../shared/service/alert.service';

@Component({
  selector: 'app-treatment-details',
  templateUrl: './treatment-details.component.html'
})
export class TreatmentDetailsComponent implements OnInit {
  //Variables
  public treatment: Treatment = new Treatment();
  requestTreatmentData: RequestedData<Treatment>;
  btnTitle: string = "Save";

  constructor(private treatmentService: TreatmentService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<TreatmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    }

  ngOnInit() {
    this.treatment.id = this.data.selectedDetails;

    if (this.treatment.id > 0) {
      this.btnTitle = 'Save';
      this.getTreatment();
    }

  }

  private getTreatment(){
    this.requestTreatmentData = new RequestedData<Treatment>();
    this.requestTreatmentData.entity = new Treatment;
    this.requestTreatmentData.entity.id = this.treatment.id;

    this.treatmentService.getTreatment(this.requestTreatmentData).subscribe(
      res => this.getTreatmentOnSuccess(res) ,        
      err => this.getTreatmentOnError(err)
    );
  }

  private getTreatmentOnSuccess(response: any){
    this.alertService.viewAlerts(response.alerts);
    this.treatment = response.entity as Treatment;
  }

  private getTreatmentOnError(response:any){
    this.alertService.viewAlerts(response.error.alerts);
  }

  public submitTreatment(form:NgForm) {
    if(form.invalid){
      return;
    }
    this.requestTreatmentData = new RequestedData<Treatment>();
    this.requestTreatmentData.entity = this.treatment;

    if (this.treatment.id > 0) {
      this.editTreatment();
    } 
    else {
      this.addTreatment();
    }
  }

  private addTreatment(){
    this.requestTreatmentData.entity.id = 0;
    this.treatmentService.addTreatment(this.requestTreatmentData).subscribe(
      res => this.treatmentActionOnSuccess(res),
      err => this.treatmentActionOnError(err)
    );

  }

  private editTreatment(){
    this.treatmentService.editTreatment(this.requestTreatmentData).subscribe(
      res => this.treatmentActionOnSuccess(res),
      err => this.treatmentActionOnError(err)
    );
  }

  private treatmentActionOnSuccess(response: any){
    this.alertService.viewAlerts(response.alerts);
    this.dialogRef.close();
  }

  private treatmentActionOnError(response:any){
    this.alertService.viewAlerts(response.error.alerts);
  }

}
