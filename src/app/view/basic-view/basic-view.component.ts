import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { ExcelService } from 'src/app/upload/excel.service';
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

  constructor(private data: DataService, private xl: ExcelService) { 
  }

  ngOnInit() {
    this.navOptionSelected = "";
    this.menuOptionSelected = "";
    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickShipping(): void {
    this.navOptionSelected = "createShipment";
    this.menuOptionSelected = "shipping";
  }

  onClickTracking() {
    this.navOptionSelected = "singleShipment";
    this.menuOptionSelected = "tracking";

  }

  onClickReporting(): void {
    this.navOptionSelected = "detailedReporting";
    this.menuOptionSelected = "reporting";

  }

  onClickAccounting(): void {
    this.navOptionSelected = "createShipment";
    this.menuOptionSelected = "accounting";

  }

  onClickInventory(): void {
    this.navOptionSelected = "createInventory";
    this.menuOptionSelected = "inventory";

  }

  onClickContackUs(): void {
    this.navOptionSelected = "createShipment";
    this.menuOptionSelected = "contactUs";

  }

  onCreateShipmentTemplate(): void {
    this.xl.createShipmentTemplate();
  }
}
