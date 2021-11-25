import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {formatDate} from '@angular/common';

import { CountryName, Shipment, Account, SenderInformation } from '../../../commonDS/DS'
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
  _customerInfo!: SenderInformation;
  _shipmentInfo!: Shipment;

  accountCodeList: Account[] = [];

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
      activity: this.fb.array([{"Event": "", "Date": "", "Time": "", "Notes": "", "Connote": "", "Driver": "", "Updated By" : ""}]),
      createdOn: formatDate(new Date(), 'dd/MM/yyy', 'en'),
      createdBy: this._accountInfo.name,
      shipmentNo:'',
      autogenerate: false,
      altRefNo:'',
      /*! Sender Information */
      referenceNo:'',
      accountCode: '' ,
      name: '',
      country: '',
      address:'',
      city: '',
      state: '',
      postalCode: '',
      contact: '',
      phone:'',
      email: '',
      recvCountryTaxId: '',
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
 
  fillAccountCode(_ac: Account[]) {
    for(let idx: number = 0; idx < _ac.length; ++idx) {
      //this.shipmentForm.controls['accountCode'].setValue(_ac[idx].accountCode);
      console.log(_ac[idx].accountCode);
    }
  }
  
  ngOnInit(): void {
    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
    //this.shipmentForm.controls.accountCode.setValue(this._accountInfo.accountCode);
    //this.crudOperation.getAccountCodeList().subscribe((data : Account[]) => {console.log(data); this.accountCodeList = data; this.fillAccountCode(this.accountCodeList);});
  }

  onSubmit()  {
    console.log(this.shipmentForm.value);
    let newShipment = new Shipment(this.shipmentForm.value);
    this.crudOperation.createShipment(newShipment).subscribe((data) => {alert("Shipment is created successfully")}, (error: any)=> {alert("Shipment Creation is Failed");}, () =>{});
  }

  onCheckboxSelect() {
    let status: boolean = false;
    status = this.shipmentForm.controls['autogenerate'].value;
    if(true == status) {
      this.shipmentForm.controls['shipmentNo'].setValue("");
    } else {
      this.shipmentForm.controls['shipmentNo'].setValue("[System Generated]");
    }
  }

  fillSenderInfo(_sInfo: SenderInformation) {
      /*! Sender Information */
      this.shipmentForm.controls['referenceNo'].setValue(_sInfo.referenceNo);
      this.shipmentForm.controls['accountCode'].setValue(_sInfo.accountCode);
      this.shipmentForm.controls['name'].setValue(_sInfo.name);
      this.shipmentForm.controls['country'].setValue(_sInfo.country);
      this.shipmentForm.controls['address'].setValue(_sInfo.address);
      this.shipmentForm.controls['city'].setValue(_sInfo.city);
      this.shipmentForm.controls['state'].setValue(_sInfo.state);
      this.shipmentForm.controls['postalCode'].setValue(_sInfo.postalCode);
      this.shipmentForm.controls['contact'].setValue(_sInfo.contact);
      this.shipmentForm.controls['phone'].setValue(_sInfo.phone);
      this.shipmentForm.controls['email'].setValue(_sInfo.email);
      this.shipmentForm.controls['recvCountryTaxId'].setValue(_sInfo.recvCountryTaxId);
  }

  fillShipmentInfo(_sInfo: Shipment) {

      this.shipmentForm.controls['shipmentNo'].setValue(_sInfo.shipmentNo);
      this.shipmentForm.controls['altRefNo'].setValue(_sInfo.altRefNo);
      this.shipmentForm.controls['referenceNo'].setValue(_sInfo.referenceNo);
      this.shipmentForm.controls['accountCode'].setValue(_sInfo.accountCode);
      this.shipmentForm.controls['name'].setValue(_sInfo.name);
      this.shipmentForm.controls['country'].setValue(_sInfo.country);
      this.shipmentForm.controls['address'].setValue(_sInfo.address);
      this.shipmentForm.controls['city'].setValue(_sInfo.city);
      this.shipmentForm.controls['state'].setValue(_sInfo.state);
      this.shipmentForm.controls['postalCode'].setValue(_sInfo.postalCode);
      this.shipmentForm.controls['contact'].setValue(_sInfo.contact);
      this.shipmentForm.controls['phone'].setValue(_sInfo.phone);
      this.shipmentForm.controls['email'].setValue(_sInfo.email);
      this.shipmentForm.controls['recvCountryTaxId'].setValue(_sInfo.recvCountryTaxId);
      this.shipmentForm.controls['service'].setValue(_sInfo.service);
      this.shipmentForm.controls['noOfItems'].setValue(_sInfo.noOfItems);
      this.shipmentForm.controls['description'].setValue(_sInfo.description);
      this.shipmentForm.controls['goodsValue'].setValue(_sInfo.goodsValue);
      this.shipmentForm.controls['customValue'].setValue(_sInfo.customValue);
      this.shipmentForm.controls['weight'].setValue(_sInfo.weight);
      this.shipmentForm.controls['weightUnit'].setValue(_sInfo.weightUnit);
      this.shipmentForm.controls['cubicWeight'].setValue(_sInfo.cubicWeight);
      this.shipmentForm.controls['codAmount'].setValue(_sInfo.codAmount);
      this.shipmentForm.controls['currency'].setValue(_sInfo.currency);
      this.shipmentForm.controls['sku'].setValue(_sInfo.sku);
      this.shipmentForm.controls['receiverName'].setValue(_sInfo.receiverName);
      this.shipmentForm.controls['receiverCountry'].setValue(_sInfo.receiverCountry);
      this.shipmentForm.controls['receiverAddress'].setValue(_sInfo.receiverAddress);
      this.shipmentForm.controls['receiverCity'].setValue(_sInfo.receiverCity);
      this.shipmentForm.controls['receiverState'].setValue(_sInfo.receiverState);
      this.shipmentForm.controls['receiverPostalCode'].setValue(_sInfo.receiverPostalCode);
      this.shipmentForm.controls['receiverContact'].setValue(_sInfo.receiverContact);
      this.shipmentForm.controls['receiverPhone'].setValue(_sInfo.receiverPhone);
      this.shipmentForm.controls['receiverEmail'].setValue(_sInfo.receiverEmail);
  }

  getSenderInfo() {
    let accountCode: string = "";
    accountCode = this.shipmentForm.controls['accountCode'].value;
    this.crudOperation.getCustomerInfo(accountCode).subscribe((data) => {this._customerInfo= data; this.fillSenderInfo(this._customerInfo)});
  }

  getShipmentInfoByAltRefNo() {

    let altRefNo: string = "";
    altRefNo = this.shipmentForm.controls['altRefNo'].value;
    this.crudOperation.getShipmentInfoByAltRefNo(altRefNo).subscribe((data) => {this._shipmentInfo= data; this.fillShipmentInfo(this._shipmentInfo)});
  }
}
