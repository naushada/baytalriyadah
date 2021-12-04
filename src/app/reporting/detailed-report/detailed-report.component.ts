import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Account, CountryName, Shipment } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

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

  detailedReportingForm:FormGroup;
  constructor(private fb: FormBuilder, private data: DataService) { 
    this._subscription = this.data.currentAccountInfo.subscribe((aInfo: Account) => this._accountInfo = aInfo);
    this.detailedReportingForm = this.fb.group({
      fromDate: new Date(),
      toDate: new Date(),
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

  }
}
