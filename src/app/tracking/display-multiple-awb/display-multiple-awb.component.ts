import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { ShipmentList, ShipmentStatus } from 'src/commonDS/DS';

@Component({
  selector: 'app-display-multiple-awb',
  templateUrl: './display-multiple-awb.component.html',
  styleUrls: ['./display-multiple-awb.component.scss']
})
export class DisplayMultipleAwbComponent implements OnInit, OnDestroy {

  _shipmentList!: ShipmentList;
  subscription!: Subscription;
  deliveredOn: string = "";
  status: string = "";
  notes: string = "";

  constructor(private data: DataService) { 
  }

  ngOnInit(): void {
    this.subscription = this.data.currentShipmentListInfo.subscribe((message: ShipmentList) => this._shipmentList = message);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
