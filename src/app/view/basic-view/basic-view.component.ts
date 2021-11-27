import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Account } from 'src/commonDS/DS';

@Component({
  selector: 'app-basic-view',
  templateUrl: './basic-view.component.html',
  styleUrls: ['./basic-view.component.scss']
})
export class BasicViewComponent implements OnInit, OnDestroy {

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
