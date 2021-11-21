import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Account, Shipment } from '../commonDS/DS'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
  }

  public shipmentInfo!: Shipment;
  public accountInfo!: Account;
  
  private accountInfoSource = new  BehaviorSubject(this.accountInfo);

  currentAccountInfo = this.accountInfoSource.asObservable();

  setAccountInfo(account: Account) {
    this.accountInfoSource.next(account);
    console.log("Naushad " + JSON.stringify(account));
    this.accountInfo = new Account(account);
    console.log(this.accountInfo);
  }

 
  private shipmentInfoSource = new  BehaviorSubject(this.shipmentInfo);

  currentShipmentInfo = this.shipmentInfoSource.asObservable();

  setShipmentInfo(shipmentInfo: Shipment) {
    this.shipmentInfoSource.next(shipmentInfo);
    console.log("Naushad " + JSON.stringify(shipmentInfo));
    this.shipmentInfo = new Shipment(shipmentInfo);
    console.log(this.shipmentInfo);
  }
}
