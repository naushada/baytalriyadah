import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryName, Shipment } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;
  createInvoiceForm:FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createInvoiceForm = this.fb.group({
      status:Events[0],
      awbNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
