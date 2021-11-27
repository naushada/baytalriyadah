import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';
import { Account } from 'src/commonDS/DS';

@Component({
  selector: 'app-shipping-main',
  templateUrl: './shipping-main.component.html',
  styleUrls: ['./shipping-main.component.scss']
})
export class ShippingMainComponent implements OnInit, OnDestroy {

  navOptionSelected: string = "";
  menuOptionSelected: string = "";

  _accountInfo!:Account;
  subscription!: Subscription;

  constructor(private data: DataService) { 
  }

  ngOnInit() {
    this.navOptionSelected = "";
    this.menuOptionSelected = "";
    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
