import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Treatment } from '../../../../core/models/treatment.model';
import { TreatmentService } from '../../../../core/servcies/treatment.service';
import { BaseComponent } from '../../../../shared/components/base-component/base-component';
import { DeleteDialogComponent } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { GridSettings } from '../../../../shared/models/grid-settings.entity';
import { RequestedData } from '../../../../shared/models/request-data.entity';
import { AlertService } from '../../../../shared/service/alert.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { hasValue } from '../../../../shared/service/helper.service';
import { TreatmentDetailsComponent } from '../treatment-details/treatment-details.component';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html'
})
export class TreatmentComponent extends BaseComponent {

  requestedTreatmentInfo: RequestedData<Treatment>;
  treatmentList = new Array<Treatment>();
  displayedColumns: string[] = ['Name', 'Description', 'actions'];
  dataSource = new MatTableDataSource(this.treatmentList);
  rowsCount: number = 0;
  searchText: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  constructor(private treatmentService: TreatmentService,
    public dialog: MatDialog,
    public router: Router,
    public dialogRef: MatDialogRef<TreatmentDetailsComponent>,
    public alertService: AlertService,
    public configService: ConfigService,
    protected cdref: ChangeDetectorRef,
    protected route: ActivatedRoute,
    protected title: Title,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(cdref, route, title);
  }

  ngOnInit(){
    this.searchSub.pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((filterValue: string) => {
      this.searchText = filterValue.trim().toLowerCase();
      this.getAllTreatments();
    });
  }
  
  ngAfterViewInit() {
    this.getAllTreatments();
  }

  private getAllTreatments() {
    this.requestedTreatmentInfo = new RequestedData<Treatment>();
    this.requestedTreatmentInfo.gridSettings = new GridSettings();

    if(hasValue(this.paginator)){
      this.requestedTreatmentInfo.gridSettings.pageIndex = this.paginator.pageIndex;
      this.requestedTreatmentInfo.gridSettings.pageSize = this.paginator.pageSize;
    }
    if(hasValue(this.searchText)){
      this.requestedTreatmentInfo.gridSettings.searchText = this.searchText;
    }

    this.treatmentService.getAllTreatments(this.requestedTreatmentInfo).subscribe(
      res => this.getAllTreatmentsOnSuccess(res),
      err => this.getAllTreatmentsOnError(err)
    );
  }

  private getAllTreatmentsOnSuccess(response: any) {
    this.alertService.viewAlerts(response.alerts);
    this.fillGrid(response);
  }

  private getAllTreatmentsOnError(response: any): void {
    this.alertService.viewAlerts(response.error.alerts);
  }

  private fillGrid(response: any) {
    this.treatmentList = response.entityList as Treatment[];
    this.paginator.length = this.rowsCount = response.gridSettings.rowsCount;
    this.dataSource = new MatTableDataSource(this.treatmentList);
    this.table.renderRows();
  }


  editRecord(id: number) {
    const dialogRef = this.dialog.open(TreatmentDetailsComponent, {
      width: '1000px',
      data: { selectedDetails: id },
      panelClass: 'details-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTreatments();
    });
  }

  addNewRecord() {
    const dialogRef = this.dialog.open(TreatmentDetailsComponent, {
      width: '1000px',
      data: { selectedDetails: null },
      panelClass: 'details-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTreatments();
    });
  }

  deleteRecord(id: number, treatmentDetails: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '650px',
      data: { selectedDetails: treatmentDetails }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'ok') {
        this.confirmDelete(id);
      }
    });
  }

  confirmDelete(id: number) {
    this.requestedTreatmentInfo.entity = new Treatment;
    this.requestedTreatmentInfo.entity.id = id;

    this.treatmentService.deleteTreatment(this.requestedTreatmentInfo).subscribe(
      res => this.deleteTreatmentOnSuccess(res),
      err => this.deleteTreatmentOnError(err)
    );
  }

  private deleteTreatmentOnSuccess(response: any) {
    this.alertService.viewAlerts(response.alerts);
    this.fillGrid(response);
  }

  private deleteTreatmentOnError(response: any) {
    this.alertService.viewAlerts(response.error.alerts);
  }

  applyFilter(filterValue: string) {
    this.searchSub.next(filterValue);
  }

  getServerData(event: any) {
    this.getAllTreatments();
  }

}
