import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Shipment } from 'src/commonDS/DS';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent implements OnInit {

  _shipmentInfo!:Shipment;
  subscription!: Subscription;

  constructor(private data: DataService) { 

    this.subscription = this.data.currentShipmentInfo.subscribe((_shInfo: Shipment) => this._shipmentInfo = new Shipment(_shInfo));
  }

  ngOnInit(): void {
  }

}
