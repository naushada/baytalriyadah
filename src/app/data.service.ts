import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Account, Shipment, ShipmentList } from '../commonDS/DS'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
  }

  public shipmentInfo!: Shipment;
  public accountInfo!: Account;
  public shipmentListInfo!: ShipmentList; 
  
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
 
  private shipmentListInfoSource = new  BehaviorSubject(this.shipmentListInfo);

  currentShipmentListInfo = this.shipmentListInfoSource.asObservable();

  setShipmentListInfo(_shipmentListInfo: ShipmentList) {
    this.shipmentListInfoSource.next(_shipmentListInfo);
    console.log("Naushad " + JSON.stringify(_shipmentListInfo));
    this.shipmentListInfo = new ShipmentList(_shipmentListInfo);
    console.log(this.shipmentListInfo);
  }
}
