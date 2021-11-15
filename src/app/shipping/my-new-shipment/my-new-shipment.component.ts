import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { CountryName, Shipment } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

import { CrudService } from 'src/rest-api/crud.service';

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
  constructor(private fb: FormBuilder, private httpc: HttpClient, private crudOperation: CrudService) { 
    this.shipmentForm = this.fb.group({
      shipmentNo:'',
      autogenerate:'',
      altRefNo:'',
      /*! Sender Information */
      billTo:'',
      name:'',
      country: CountryName[0],
      address:'',
      city:'',
      state:'',
      postalCode:'',
      contact:'',
      phone:'',
      email:'',
      recvCountryTaxId:'',
      /*! Shipment Information */
      service:ServiceType[0],
      noOfItems:'',
      description:'',
      harmonizedCode:'',
      weight:'',
      weightUnit:'',
      cubicWeight:'',
      codAmount:'',
      currency:Currency[0],

      /*! Receiver Information */
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
  }

  onSubmit()  {
    console.log(this.shipmentForm.value);
    let newShipment = new Shipment(this.shipmentForm.value);
    this.crudOperation.createShipment(newShipment).subscribe((data) => {console.log(data);});
  }
}
