import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryName, Shipment } from '../../../commonDS/DS'
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

  detailedReportingForm:FormGroup;
  constructor(private fb: FormBuilder) { 
    this.detailedReportingForm = this.fb.group({
      fromDate: new Date(),
      toDate: new Date(),
      country:CountryName[0],
      accountCode:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
