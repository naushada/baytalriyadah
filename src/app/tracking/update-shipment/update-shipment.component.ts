import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryName, Shipment } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

@Component({
  selector: 'app-update-shipment',
  templateUrl: './update-shipment.component.html',
  styleUrls: ['./update-shipment.component.scss']
})
export class UpdateShipmentComponent implements OnInit {

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  updateShipmentStatusForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.updateShipmentStatusForm = this.fb.group({
      event:this.EventList[0],
      date:'',
      time:'',
      notes:'',
      connote:'',
      driverName:'',
      updatedBy:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
