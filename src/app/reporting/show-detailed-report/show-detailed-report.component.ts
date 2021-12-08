import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Shipment, ShipmentList } from 'src/commonDS/DS';

@Component({
  selector: 'app-show-detailed-report',
  templateUrl: './show-detailed-report.component.html',
  styleUrls: ['./show-detailed-report.component.scss']
})
export class ShowDetailedReportComponent implements OnInit {
  shipmentList!: ShipmentList;
  subscription: Subscription;
  
  constructor(private data: DataService) { 

    this.subscription = this.data.currentShipmentListInfo.subscribe((sInfo: ShipmentList) => this.shipmentList = sInfo);
  }

  ngOnInit(): void {
  }

}
