import { Component, Inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clinic } from '../../../../core/models/clinic.model';
import { Appointment } from '../../../../core/models/appointment.model';
import { AppointmentService } from '../../../../core/servcies/appointment.service';
import { DetailsListEnum } from '../../../../shared/enum/details-list.enum';
import { RequestedData } from '../../../../shared/models/request-data.entity';
import { AlertService } from '../../../../shared/service/alert.service';
import { hasValue, listHasValue } from '../../../../shared/service/helper.service';
import { Patient } from '../../../../core/models/patient.model';
import { User } from '../../../../core/models/user.model';
import { AppointmentCategory } from '../../../../core/models/appointment-category.model';
import { GenderEnum } from '../../../../shared/enum/gender.enum';
import { AppointmentAddition } from '../../../../core/models/appointment-addition.model';
import { ToothPositionEnum } from '../../../../shared/enum/appointment-tooth.enum';
import { AppointmentTooth } from '../../../../core/models/appointment-tooth.model';
import { ConfigService } from '../../../../shared/service/config.service';
import { Attachment } from '../../../../core/models/attachment.model';
import { PatientDetailsComponent } from '../../../patient/components/patient-details/patient-details.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html'
})
export class AppointmentDetailsComponent implements OnInit {

  @ViewChild('imgViewer') imgViewer: TemplateRef<any>;

  //Variables
  public appointment: Appointment = new Appointment();
  requestAppointmentData: RequestedData<Appointment>;
  uploadURL:string;

  // Lists
  clinicList = new Array<Clinic>();
  filteredClinicList = new Array<Clinic>();
  patientList = new Array<Patient>();
  filteredPatientList = new Array<Patient>();
  userList = new Array<User>();
  filteredUserList = new Array<User>();
  categoryList = new Array<AppointmentCategory>();
  filteredCategoryList = new Array<AppointmentCategory>();
  appointmentAdditionList = new Array<AppointmentAddition>();
  imgViewerSrc: string;

  //Enums
  genderEnum = GenderEnum;
  toothPositionEnum = ToothPositionEnum;

  constructor(private AppointmentService: AppointmentService,
    private alertService: AlertService,
    private configService: ConfigService,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.appointment.id = this.data.selectedDetails;
    this.uploadURL = this.configService.configuration.apiUrl + this.AppointmentService.url + "UploadImages";
    if (this.appointment.id > 0) {
      this.getAppointment();
    }
    else {
      this.addNewTooth();
      this.getDetailsLists();
    }
  }

  private getAppointment() {
    this.requestAppointmentData = new RequestedData<Appointment>();
    this.requestAppointmentData.entity = new Appointment;
    this.requestAppointmentData.entity.id = this.appointment.id;

    this.AppointmentService.getAppointment(this.requestAppointmentData).subscribe(
      res => this.getAppointmentOnSuccess(res),
      err => this.getAppointmentOnError(err)
    );
  }

  private getAppointmentOnSuccess(response: any) {
    this.alertService.viewAlerts(response.alerts);
    this.appointment = response.entity as Appointment;
    this.setDetailsLists(response);
  }

  private getAppointmentOnError(response: any) {
    this.alertService.viewAlerts(response.error.alerts);
  }

  public submitAppointment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.requestAppointmentData = new RequestedData<Appointment>();
    this.requestAppointmentData.entity = this.appointment;

    if (this.appointment.id > 0) {
      this.editAppointment();
    }
    else {
      this.addAppointment();
    }
  }

  private addAppointment() {
    this.requestAppointmentData.entity.id = 0;
    this.AppointmentService.addAppointment(this.requestAppointmentData).subscribe(
      res => this.AppointmentActionOnSuccess(res),
      err => this.AppointmentActionOnError(err)
    );
  }

  private editAppointment() {
    this.AppointmentService.editAppointment(this.requestAppointmentData).subscribe(
      res => this.AppointmentActionOnSuccess(res),
      err => this.AppointmentActionOnError(err)
    );
  }

  private AppointmentActionOnSuccess(response: any) {
    this.alertService.viewAlerts(response.alerts);
  }

  private AppointmentActionOnError(response: any) {
    this.alertService.viewAlerts(response.error.alerts);
  }

  private getDetailsLists() {
    this.requestAppointmentData = new RequestedData<Appointment>();

    this.AppointmentService.getAppointmentDetailsLists(this.requestAppointmentData).subscribe(
      res => this.getAppointmentDetailsListsOnSuccess(res),
      err => this.getAppointmentDetailsListsOnError(err)
    );
  }

  private getAppointmentDetailsListsOnSuccess(response: any) {
    this.alertService.viewAlerts(response.alerts);
    this.setDetailsLists(response);
  }

  private getAppointmentDetailsListsOnError(response: any) {
    this.alertService.viewAlerts(response.error.alerts);
  }

  public filterClinic(value: string) {
    let filter = value.toLowerCase();
    this.filteredClinicList = this.clinicList
      .filter(option => option.name.toLowerCase().startsWith(filter));
  }

  public filterPatient(value: string) {
    let filter = value.toLowerCase();
    this.filteredPatientList = this.patientList
      .filter(option => option.fullName.toLowerCase().startsWith(filter) || option.phone.startsWith(filter));
  }

  public filterUser(value: string) {
    let filter = value.toLowerCase();
    this.filteredUserList = this.userList
      .filter(option => option.fullName.toLowerCase().startsWith(filter));
  }

  public filterCategory(value: string) {
    let filter = value.toLowerCase();
    this.filteredCategoryList = this.categoryList
      .filter(option => option.name.toLowerCase().startsWith(filter));
  }

  public selectAppointmentAddition(selectedId: number, checked: boolean) {
    if (checked) {
      this.appointment.appointmentAdditionList.push(this.appointmentAdditionList.find(a => a.id == selectedId));
    }
    else {
      this.appointment.appointmentAdditionList = this.appointment.appointmentAdditionList.filter(m => m.id != selectedId);
    }
    this.updatePrices();
  }

  public isChecked(checkBoxId: number) {
    if (listHasValue(this.appointment.appointmentAdditionList) && this.appointment.appointmentAdditionList.some(m => m.id == checkBoxId)) {
      return true;
    }
    else {
      return false;
    }
  }

  public addNewTooth(){
    this.appointment.toothList.push( new AppointmentTooth());
  }
  public removeTooth(toothIndex: number){
    this.appointment.toothList.splice(toothIndex, 1);
  }
  public updatePrices(){
    this.appointment.totalPrice = this.appointment.category.price;
    this.appointment.appointmentAdditionList.forEach(element => {
      this.appointment.totalPrice += element.price;
    });
  }
  public createImgPath (serverPath: string){
    return this.configService.configuration.apiUrl + serverPath;
  }
  public uploadFinished = (event) => {
    if(event != undefined)
    {
      this.appointment.attachmentList.push({url: event.dbPath } as Attachment);
    }
  }

  public viewImg(index: number){
    this.imgViewerSrc = this.createImgPath(this.appointment.attachmentList[index].url);
    this.dialog.open(this.imgViewer);
  }

  public removeImg(index: number){
    this.appointment.attachmentList.splice(index, 1);
  }

  addNewPatient() {
    const dialogRef = this.dialog.open(PatientDetailsComponent, {
      width: '1000px',
      data: { selectedDetails: null },
      panelClass: 'details-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDetailsLists();
    });
  }

  editPatient(id: number) {
    const dialogRef = this.dialog.open(PatientDetailsComponent, {
      width: '1000px',
      data: { selectedDetails: id },
      panelClass: 'details-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDetailsLists();
    });
  }


  private setDetailsLists(response: RequestedData<any>) {
    if (listHasValue(response.detailsList)) { }
    response.detailsList.forEach(list => {
      switch (list.detailsListId) {
        case DetailsListEnum.Clinic:
          this.clinicList = list.list;
          this.filteredClinicList = this.clinicList;
          break;

        case DetailsListEnum.Patient:
          this.patientList = list.list;
          this.filteredPatientList = this.patientList;

          if(hasValue(this.appointment.patient.id)){
            let selectedPatientId = this.appointment.patient.id;
            this.appointment.patient = this.patientList.find(p => p.id == selectedPatientId);
          }
          break;

        case DetailsListEnum.User:
          this.userList = list.list;
          this.filteredUserList = this.userList;
          break;

        case DetailsListEnum.AppointmentCategory:
          this.categoryList = list.list;
          this.filteredCategoryList = this.categoryList;
          break;

        case DetailsListEnum.AppointmentAddition:
          this.appointmentAdditionList = list.list;
          break;
      }
    });
  }

  public cancel(){
    this.router.navigate(['appointment']);
  }

}