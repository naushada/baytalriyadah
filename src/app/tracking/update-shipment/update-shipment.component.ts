import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {formatDate} from '@angular/common';
import { DataService } from 'src/app/data.service';
import { CrudService } from 'src/rest-api/crud.service';
import { Account, CountryName, Shipment, ShipmentStatus } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

@Component({
  selector: 'app-update-shipment',
  templateUrl: './update-shipment.component.html',
  styleUrls: ['./update-shipment.component.scss']
})
export class UpdateShipmentComponent implements OnInit, OnDestroy {

  _accountInfo!:Account;
  subscription!: Subscription;
  _shipmentInfo!: Shipment;

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  updateShipmentStatusForm: FormGroup;
  constructor(private fb: FormBuilder, private data: DataService, private crudOperation: CrudService) { 

    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
    this.updateShipmentStatusForm = this.fb.group({
      date:'',
      event:this.EventList[0],
      time:'',
      notes:'',
      driverName:'',
      updatedBy: this._accountInfo.name,
      eventLocation:'',
      connote:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let awbNo: string = this.updateShipmentStatusForm.controls['connote'].value;
    let activity: ShipmentStatus = new ShipmentStatus();
    activity._date = formatDate(this.updateShipmentStatusForm.controls['date'].value, 'dd/MM/yyy', 'en');
    activity._evt = this.updateShipmentStatusForm.controls['event'].value;
    activity._time = this.updateShipmentStatusForm.controls['time'].value;
    activity._notes = this.updateShipmentStatusForm.controls['notes'].value;
    activity._driver = this.updateShipmentStatusForm.controls['driverName'].value;
    activity._updatedBy = this.updateShipmentStatusForm.controls['updatedBy'].value;
    activity._eventLocation = this.updateShipmentStatusForm.controls['eventLocation'].value;

    console.log(activity);
    this.crudOperation.updateShipment(awbNo, activity).subscribe((data) => {alert("Sipment Status is Updated Successfully");this.updateShipmentStatusForm.reset();},
              (error) => {alert("Shipment Status Update is Failed")},
              () => {});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
