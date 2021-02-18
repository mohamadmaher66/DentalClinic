import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { AlertService } from '../../service/alert.service';
import { Alert } from '../../models/alert.entity';
import { AlertType } from '../../enum/alert-type.enum';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  public progress: number;
  public message: string;
  public isUploaded: boolean;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    debugger;

    this.http.post('https://localhost:44335/api/shared/Upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => this.uploadOnSuccess(event),
        err => this.uploadOnError(err));
  }

  private uploadOnSuccess(event: any) {
    if (event.type === HttpEventType.UploadProgress)
      this.progress = Math.round(100 * event.loaded / event.total);
    else if (event.type === HttpEventType.Response) {
      let alerts = new Array<Alert>();
      alerts.push({ type: AlertType.Info, title: "Info", message:"Image Uploaded Successfully!."})
      this.alertService.viewAlerts(alerts);
      this.isUploaded = true;
      this.onUploadFinished.emit(event.body);
    }
  }

  private uploadOnError(error: any) {
    this.alertService.viewAlerts(error.error);
    this.isUploaded = false;
  }
}
  
