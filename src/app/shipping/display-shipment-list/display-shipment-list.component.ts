import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { ShipmentList } from 'src/commonDS/DS';

@Component({
  selector: 'app-display-shipment-list',
  templateUrl: './display-shipment-list.component.html',
  styleUrls: ['./display-shipment-list.component.scss']
})
export class DisplayShipmentListComponent implements OnInit {

  subscription: Subscription;
  _shipmentListInfo!: ShipmentList;

  shInfo: any = [];
  constructor(private data: DataService) { 
    this.subscription = this.data.currentShipmentListInfo.subscribe(
          (message: ShipmentList) => {this._shipmentListInfo = message;});
  }

  ngOnInit(): void {
    /*
    for(let idx = 0; idx < this._shipmentListInfo.length; ++idx) {
      this.shInfo.push(this._shipmentListInfo.m_elm[idx]);
    }
    */
  }

}
