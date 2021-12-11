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
  subscription: Subscription;
  deliveredOn: string = "";
  status: string = "";
  notes: string = "";

  constructor(private data: DataService) { 
    this.subscription = this.data.currentShipmentListInfo.subscribe((message: ShipmentList) => this._shipmentList = message);
  }

  ngOnInit(): void {
  }

  get_lastStatus(data: ShipmentStatus[]): string {
    let activity: any = data.reverse()[0];
    let status: string = activity.event;
    if(status == "Proof of Delivery") {
      this.deliveredOn = activity.date + " " + activity.time;
    }

    this.status = status;
    this.notes = activity.notes;
    return(status);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
