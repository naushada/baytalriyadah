import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryName, Shipment } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

@Component({
  selector: 'app-successful-delivery',
  templateUrl: './successful-delivery.component.html',
  styleUrls: ['./successful-delivery.component.scss']
})
export class SuccessfulDeliveryComponent implements OnInit {

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  postDeliveryForm: FormGroup;
  constructor(private fb:FormBuilder) { 
    this.postDeliveryForm = this.fb.group({
      status: Events[0],
      rtoAmount:'',
      awbNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
