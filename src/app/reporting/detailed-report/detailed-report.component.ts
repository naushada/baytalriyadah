import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Account, CountryName, Shipment, ShipmentList } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'
import {formatDate} from '@angular/common';
import { CrudService } from 'src/rest-api/crud.service';

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.component.html',
  styleUrls: ['./detailed-report.component.scss']
})
export class DetailedReportComponent implements OnInit {

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  _accountInfo!: Account;
  _subscription!: Subscription;
  onEmployeeLogin: boolean = false;
  showComponent: boolean = false;
  shipmentList!: ShipmentList;

  detailedReportingForm:FormGroup;
  constructor(private fb: FormBuilder, private data: DataService, private crudOperation: CrudService) { 
    this._subscription = this.data.currentAccountInfo.subscribe((aInfo: Account) => this._accountInfo = aInfo);
    this.detailedReportingForm = this.fb.group({
      fromDate: '',
      toDate: '',
      country:CountryName[0],
      accountCode:''
    });
  }

  ngOnInit(): void {
    if(this._accountInfo.role == "Employee") {
      this.onEmployeeLogin = false;
    } else {
      this.detailedReportingForm.controls['accountCode'].setValue(this._accountInfo.accountCode);
      //this.detailedReportingForm.controls['accountCode'].disabled;
      this.onEmployeeLogin = true;
    }
  }

  onSubmit() {

    let fromDate: string = formatDate(this.detailedReportingForm.controls['fromDate'].value, 'dd/MM/yyyy', 'en');
    let toDate: string = formatDate(this.detailedReportingForm.controls['toDate'].value, 'dd/MM/yyyy', 'en');
    let country: string = this.detailedReportingForm.controls['country'].value;
    let accountCode: string = this.detailedReportingForm.controls['accountCode'].value;
    let acList = new Array<string>();
    acList = accountCode.split("\n");

    this.crudOperation.getShipmentInfoByAccountCodeList(fromDate,toDate,country, acList)
      .subscribe((rsp:Shipment[]) => {
        this.shipmentList = new ShipmentList(rsp, rsp.length);
        this.data.setShipmentListInfo(this.shipmentList);
        this.showComponent = true;

      },
      error => {
        alert("Invalid Parameters provided ");
        this.showComponent = false;
      },
      /**Operation is executed successfully */
      () => {});
  }
}
