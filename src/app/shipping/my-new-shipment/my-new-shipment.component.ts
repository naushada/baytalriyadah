import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {formatDate} from '@angular/common';

import { CountryName, Shipment, Account } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

import { CrudService } from 'src/rest-api/crud.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-my-new-shipment',
  templateUrl: './my-new-shipment.component.html',
  styleUrls: ['./my-new-shipment.component.scss']
})
export class MyNewShipmentComponent implements OnInit {

  _accountInfo!:Account;
  subscription!: Subscription;


  /* These are the Global Properties defined in DS.ts file. */
  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  shipmentForm: FormGroup;
  constructor(private fb: FormBuilder, private httpc: HttpClient, private crudOperation: CrudService, private data: DataService) { 
    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);

    this.shipmentForm = this.fb.group({
      status: ["Created"],
      createdOn: formatDate(new Date(), 'dd/MM/yyy', 'en'),
      shipmentNo:'',
      autogenerate:'true',
      altRefNo:'',
      /*! Sender Information */
      referenceNo:'',
      accountCode: this._accountInfo &&  this._accountInfo.accountCode || "" ,
      name: this._accountInfo && this._accountInfo.name || "",
      country: this._accountInfo && this._accountInfo.country || "",
      address:this._accountInfo && this._accountInfo.address || "",
      city: this._accountInfo && this._accountInfo.city || "",
      state: this._accountInfo && this._accountInfo.state || "",
      postalCode: this._accountInfo && this._accountInfo.postalCode || "",
      contact: this._accountInfo && this._accountInfo.contact || "",
      phone:this._accountInfo && this._accountInfo.phone || "",
      email: this._accountInfo && this._accountInfo.email || "",
      recvCountryTaxId: this._accountInfo && this._accountInfo.recvCountryTaxId,
      /*! Shipment Information */
      service:ServiceType[0],
      noOfItems:'',
      description:'',
      goodsValue:'',
      customValue:'',
      weight:'',
      weightUnit:'',
      cubicWeight:'',
      codAmount:'',
      currency:Currency[0],

      /*! Receiver Information */
      sku:'',
      receiverName:'',
      receiverCountry:CountryName[0],
      receiverAddress:'',
      receiverCity:'',
      receiverState:'',
      receiverPostalCode:'',
      receiverContact:'',
      receiverPhone:'',
      receiverEmail:''
  });

  }
  
  ngOnInit(): void {
    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
    console.log(this._accountInfo);
    //this.shipmentForm.controls.accountCode.setValue(this._accountInfo.accountCode);
  }

  onSubmit()  {
    console.log(this.shipmentForm.value);
    let newShipment = new Shipment(this.shipmentForm.value);
    this.crudOperation.createShipment(newShipment).subscribe((data) => {console.log(data);});
  }
}
