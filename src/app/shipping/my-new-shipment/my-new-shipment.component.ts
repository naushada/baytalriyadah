import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryName } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role } from '../../../commonDS/DS'

@Component({
  selector: 'app-my-new-shipment',
  templateUrl: './my-new-shipment.component.html',
  styleUrls: ['./my-new-shipment.component.scss']
})
export class MyNewShipmentComponent implements OnInit {

  /* These are the Global Properties defined in DS.ts file. */
  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  shipmentForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.shipmentForm = this.fb.group({
      billTo:'',
      name:'',
      country:'',
      address:'',
      city:'',
      state:'',
      postalCode:'',
      contact:'',
      phone:'',
      email:'',
      recvCountryTaxId:''

  });

  }
  
  ngOnInit(): void {
  }

  onSubmit() : void {

  }
}
