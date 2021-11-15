import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { CountryName, Shipment } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

import { CrudService } from 'src/rest-api/crud.service';

@Component({
  selector: 'app-create-thirdrdparty-shipment',
  templateUrl: './create-thirdrdparty-shipment.component.html',
  styleUrls: ['./create-thirdrdparty-shipment.component.scss']
})
export class CreateThirdrdpartyShipmentComponent implements OnInit {

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  thirdpartyForm: FormGroup;

  constructor(private fb:FormBuilder, private httpc: HttpClient, private crudOperation: CrudService) { 
    this.thirdpartyForm = this.fb.group({
      customerId:'',
      secretKey:'',
      bookingMode:'',
      codAmount:'',
      referenceId:'',
      origin:'',
      destination:'',
      service:'',
      senderName:'',
      senderAddress:'',
      senderPhone:'',
      senderEmail:'',
      receiverName:'',
      receiverAddress:'',
      receiverPhone:'',
      receiverEmail:'',
      description:'',
      productType:'',
      noOfItems:'',
      weight:''
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
