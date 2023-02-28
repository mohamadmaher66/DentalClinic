import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/service/http-service';
import { Treatment } from '../models/treatment.model';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  url: string = "api/treatment/";
  treatments: Treatment[];

  constructor(private httpService: HttpService) { }

  public getAllTreatments(object: any) {
    return this.httpService.httpPost(object, this.url + 'GetAllTreatments');
  }

  public getAllTreatmentLite(object: any) {
    return this.httpService.httpPost(object, this.url + 'GetAllTreatmentLite');
  }

  public getTreatment(object: any) {
    return this.httpService.httpPost(object, this.url + 'GetTreatment');
  }

  public addTreatment(object: any) {
    return this.httpService.httpPost(object, this.url + 'AddTreatment');
  }

  public editTreatment(object: any) {
    return this.httpService.httpPost(object, this.url + 'EditTreatment');
  }
  public deleteTreatment(object: any) {
    return this.httpService.httpPost(object, this.url + 'DeleteTreatment');
  }

}
