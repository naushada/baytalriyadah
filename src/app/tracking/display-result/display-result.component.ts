import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Shipment, ShipmentStatus } from 'src/commonDS/DS';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent implements OnInit {

  _shipmentInfo!:Shipment;
  subscription!: Subscription;
  _status: Array<ShipmentStatus> = new Array<ShipmentStatus>();

  constructor(private data: DataService) { 

    this.subscription = this.data.currentShipmentInfo.subscribe((_shInfo: Shipment) => this._shipmentInfo = new Shipment(_shInfo));
  }

  ngOnInit(): void {
    console.log(this._shipmentInfo);
    this._status = this._shipmentInfo.activity.reverse();
  }



}
