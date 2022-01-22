import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {formatDate} from '@angular/common';
import { DataService } from 'src/app/data.service';
import { CrudService } from 'src/rest-api/crud.service';
import { Account, CountryName, EventLocation, Shipment, ShipmentStatus } from '../../../commonDS/DS'
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
  CityNames = EventLocation;

  updateShipmentStatusForm: FormGroup;
  constructor(private fb: FormBuilder, private data: DataService, private crudOperation: CrudService) { 

    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
    this.updateShipmentStatusForm = this.fb.group({
      date:[formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en')],
      event:this.EventList[0],
      time:'',
      notes:'',
      driverName:'',
      updatedBy: this._accountInfo.name,
      eventLocation: this.CityNames[1],
      manualEvtLoc:'',
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

    if(this.updateShipmentStatusForm.get('manualEvtLoc')?.value.length) {
      activity._eventLocation = this.updateShipmentStatusForm.controls['manualEvtLoc'].value;
    }

    let awbNoList = new Array<string>();
    awbNo = awbNo.trim();
    awbNoList = awbNo.split("\n");

    this.crudOperation.updateShipment(awbNoList, activity).subscribe((data) => {
                          alert("Sipment Status is Updated Successfully");
                          this.updateShipmentStatusForm.get('connote')?.setValue('');
                          this.updateShipmentStatusForm.get('notes')?.setValue('');
                        },
              (error) => {alert("Shipment Status Update is Failed")},
              () => {});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
