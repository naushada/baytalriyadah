import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { ShipmentList } from 'src/commonDS/DS';

@Component({
  selector: 'app-display-shipment-list',
  templateUrl: './display-shipment-list.component.html',
  styleUrls: ['./display-shipment-list.component.scss']
})
export class DisplayShipmentListComponent implements OnInit , OnDestroy{

  subscription: Subscription;
  _shipmentListInfo!: ShipmentList;
  selected: boolean[] = [];

  shInfo: any = [];
  constructor(private data: DataService) { 
    let checkboxes = document.getElementsByName("shipment");
    for( let idx: number=1; idx < checkboxes.length; ++idx) {
      this.selected[idx] = false;
    }
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

  onSelectAll() {
    let checkboxes = document.getElementsByName("shipment");
    for(var i = 0; i < checkboxes.length; i++)  
    {
      if(this.selected[i] == false)
        this.selected[i] = true;
        else 
          this.selected[i] = false;

       /* 
        if(checkboxes[i].checked) {
          checkboxes[i].checked = false;
        } else {
          checkboxes[i].checked = true;

        }*/
    }  
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
