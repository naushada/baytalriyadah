import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Account } from '../commonDS/DS'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
  }

  public accountInfo!: Account;
  
  private messageSource = new  BehaviorSubject(this.accountInfo);

  currentAccountInfo = this.messageSource.asObservable();

  setAccountInfo(account: Account) {
    this.messageSource.next(account);
    console.log("Naushad " + JSON.stringify(account));
    this.accountInfo = new Account(account);
    console.log(this.accountInfo);
  }
}
