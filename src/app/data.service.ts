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
    this.accountInfo = new Account(account);
  }

 
  private shipmentInfoSource = new  BehaviorSubject(this.shipmentInfo);

  currentShipmentInfo = this.shipmentInfoSource.asObservable();

  setShipmentInfo(shipmentInfo: Shipment) {
    this.shipmentInfoSource.next(shipmentInfo);
    this.shipmentInfo = new Shipment(shipmentInfo);
  }
 
  private shipmentListInfoSource = new  BehaviorSubject(this.shipmentListInfo);

  currentShipmentListInfo = this.shipmentListInfoSource.asObservable();

  setShipmentListInfo(_shipmentListInfo: ShipmentList) {
    this.shipmentListInfoSource.next(_shipmentListInfo);
    this.shipmentListInfo = new ShipmentList(_shipmentListInfo.m_shipmentArray, _shipmentListInfo.m_length);
  }
}
