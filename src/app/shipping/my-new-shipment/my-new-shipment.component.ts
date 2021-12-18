import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class MyNewShipmentComponent implements OnInit, OnDestroy {

  _accountInfo!:Account;
  subscription!: Subscription;
  _customerInfo!: SenderInformation;
  _shipmentInfo!: Shipment;

  accountCodeList: Array<Account> = new Array<Account>();

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
      //activity: this.fb.array([{"Date": "", "Event": "", "Time": "", "Notes": "", "Driver": "", "Updated By" : "", "EventLocation": ""}]),
      activity: this.fb.array([{date:formatDate(new Date(), 'dd/MM/yyyy', 'en'), event:'Document Created', time: new Date().getHours() +':' + new Date().getMinutes(), notes: "", driver: "", updatedBy : this._accountInfo.name, eventLocation: ''}]),
      createdOn: '',
      createdBy: '',
      shipmentNo:'',
      autogenerate: false,
      altRefNo:'',
      /*! Sender Information */
      addressBook: '',
      referenceNo:'',
      accountCode: '',
      coName:'',
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
      service:ServiceType[1],
      noOfItems:'',
      description:'',
      goodsValue:'',
      customValue:'',
      weight:'',
      weightUnit:'',
      cubicWeight:'',
      codAmount:'',
      vat:'',
      currency:Currency[1],
      sku:'',

      /*! Receiver Information */
      receiverName:'',
      receiverCountry:CountryName[1],
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

    this.crudOperation.getAccountCodeList().subscribe((data : Account[]) => 
        {
          data.forEach((item: Account) => {
            this.accountCodeList.push(new Account(item));
          });
        },

        (error)=> {},

        () => {});

    if(this._accountInfo && this._accountInfo.role == "Customer") {
      this.fillCustomerInfo();
    }
  }

  onChangeAccountCode() {
    this.shipmentForm.get('accountCode')?.setValue(this.shipmentForm.get('addressBook')?.value);
  }

  fillCustomerInfo() {
     /*! Sender Information */
    this.shipmentForm.controls['referenceNo'].setValue("");
    this.shipmentForm.controls['accountCode'].setValue(this._accountInfo.accountCode);
    this.shipmentForm.controls['coName'].setValue(this._accountInfo.companyName);
    this.shipmentForm.controls['name'].setValue(this._accountInfo.name);
    this.shipmentForm.controls['country'].setValue(this._accountInfo.country);
    this.shipmentForm.controls['address'].setValue(this._accountInfo.address);
    this.shipmentForm.controls['city'].setValue(this._accountInfo.city);
    this.shipmentForm.controls['state'].setValue(this._accountInfo.state);
    this.shipmentForm.controls['postalCode'].setValue(this._accountInfo.postalCode);
    this.shipmentForm.controls['contact'].setValue(this._accountInfo.contact);
    this.shipmentForm.controls['phone'].setValue("");
    this.shipmentForm.controls['email'].setValue(this._accountInfo.email);
    this.shipmentForm.controls['recvCountryTaxId'].setValue("");

  }

  onSubmit()  {
    this.shipmentForm.controls['createdOn'].setValue(formatDate(new Date(), 'dd/MM/yyy', 'en'));
    this.shipmentForm.controls['createdBy'].setValue(this._accountInfo.name);
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
      this.shipmentForm.controls['accountCode'].setValue(_sInfo.aInfo.accountCode);
      this.shipmentForm.controls['coName'].setValue(_sInfo.aInfo.companyName);
      this.shipmentForm.controls['name'].setValue(_sInfo.aInfo.name);
      this.shipmentForm.controls['country'].setValue(_sInfo.aInfo.country);
      this.shipmentForm.controls['address'].setValue(_sInfo.aInfo.address);
      this.shipmentForm.controls['city'].setValue(_sInfo.aInfo.city);
      this.shipmentForm.controls['state'].setValue(_sInfo.aInfo.state);
      this.shipmentForm.controls['postalCode'].setValue(_sInfo.aInfo.postalCode);
      this.shipmentForm.controls['contact'].setValue(_sInfo.aInfo.contact);
      this.shipmentForm.controls['phone'].setValue(_sInfo.phone);
      this.shipmentForm.controls['email'].setValue(_sInfo.aInfo.email);
      this.shipmentForm.controls['recvCountryTaxId'].setValue(_sInfo.recvCountryTaxId);
  }

  fillShipmentInfo(_sInfo: Shipment) {

      this.shipmentForm.controls['shipmentNo'].setValue(_sInfo.shipmentNo);
      this.shipmentForm.controls['altRefNo'].setValue(_sInfo.altRefNo);

      /**Sender Information */
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

      /**Shipment Information */
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

      /** Receiver Information */
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
    this.crudOperation.getCustomerInfo(accountCode).subscribe((data: Account) => {this._customerInfo = new SenderInformation(data); this.fillSenderInfo(this._customerInfo)});
  }

  getShipmentInfoByAltRefNo() {

    let altRefNo: string = "";
    altRefNo = this.shipmentForm.controls['altRefNo'].value;
    if(this._accountInfo.role == "Employee") {
      this.crudOperation.getShipmentInfoByAltRefNo(altRefNo).subscribe((data) => {this._shipmentInfo= data; this.fillShipmentInfo(this._shipmentInfo)});
    } else {

      this.crudOperation.getShipmentInfoByAltRefNoForCustomer(altRefNo, this._accountInfo.accountCode).subscribe((data) => {this._shipmentInfo= data; this.fillShipmentInfo(this._shipmentInfo)});
    }
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
