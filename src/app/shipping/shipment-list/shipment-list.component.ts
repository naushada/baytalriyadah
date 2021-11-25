import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {formatDate} from '@angular/common';
import { CrudService } from 'src/rest-api/crud.service';
import { CountryName, Shipment, Account, SenderInformation, ShipmentList } from '../../../commonDS/DS'
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit {

  shipmentListForm: FormGroup;
  _shipmentList!: ShipmentList;
  //_shipmentList!: Shipment[];
  m_displayList: string = "";
  _accountInfo!:Account;
  subscription!: Subscription;

  constructor(private fb:FormBuilder, private crudOperation: CrudService, private data: DataService) { 
    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
    this.shipmentListForm = this.fb.group({
      fromDate: new Date(),
      toDate: new Date()
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
    let fromDate: string = formatDate(this.shipmentListForm.controls['fromDate'].value, 'dd/MM/yyyy', 'en');
    let toDate: string = formatDate(this.shipmentListForm.controls['toDate'].value, 'dd/MM/yyyy', 'en');
    console.log(this.shipmentListForm.value);
    let who: string =this._accountInfo.role;
    if(who == "Employee") {
      this.crudOperation.getShipmentList(fromDate, toDate).subscribe((data: Shipment[]) => {
          this._shipmentList = new ShipmentList(); this._shipmentList.set_elm(data); this._shipmentList.set_length(length);
          /*! Make shipmentList available to other component who subscribe for it. */
          this.data.setShipmentListInfo(this._shipmentList);
          this.m_displayList = "true";
      },
      (error: any) => { this.m_displayList = "false";},
      () => {console.log("End of list");});
    } else {
      let accountCode: string = this._accountInfo.accountCode;
      this.crudOperation.getShipmentListForCustomer(fromDate, toDate, accountCode).subscribe((data: Shipment[]) => {
          this._shipmentList = new ShipmentList(); this._shipmentList.set_elm(data); this._shipmentList.set_length(length);
          /*! Make shipmentList available to other component who subscribe for it. */
          this.data.setShipmentListInfo(this._shipmentList);
          this.m_displayList = "true";
      },
      (error: any) => { this.m_displayList = "false";},
      () => {console.log("End of list");});

    }
  }
}
