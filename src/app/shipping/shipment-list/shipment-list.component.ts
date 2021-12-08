import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
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

  m_displayList: string = "";
  _accountInfo!:Account;
  subscription!: Subscription;

  m_current_date: any = new Date();
  constructor(private fb:FormBuilder, private crudOperation: CrudService, private data: DataService) { 
    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
    this.shipmentListForm = this.fb.group({
      fromDate: [''],
      toDate: ''
    });
  }

  ngOnInit(): void {
    this.shipmentListForm.controls['fromDate'].setValue(formatDate(this.m_current_date, 'dd/MM/yyyy', 'en'));
    this.shipmentListForm.controls['toDate'].setValue(formatDate(new Date(), 'dd/MM/yyyy', 'en'));
  }

  onSubmit() {
    
    let fromDate: string = formatDate(this.shipmentListForm.controls['fromDate'].value, 'dd/MM/yyyy', 'en');
    let toDate: string = formatDate(this.shipmentListForm.controls['toDate'].value, 'dd/MM/yyyy', 'en');
    //console.log(this.shipmentListForm.value);
    let who: string =this._accountInfo.role;
    if(who == "Employee") {
      this.crudOperation.getShipmentList(fromDate, toDate).subscribe((data: Shipment[]) => {
          //this._shipmentList = new ShipmentList(); 
          /** invoke the setter of ShipmentList class  */
          this._shipmentList = new ShipmentList(data, data.length);

          /*
          for(let idx: number = 0; idx < data.length; ++idx) {
            this._shipmentList.push(data[idx]);
          }
          */
          //this._shipmentList.set_elm(data); this._shipmentList.set_length(length);
          /*! Make shipmentList available to other component who subscribe for it. */
          this.data.setShipmentListInfo(this._shipmentList);
          this.m_displayList = "true";
          //console.log("data: " + data);
          //console.log("Var: " + this._shipmentList);
      },
      (error: any) => { this.m_displayList = "false";},
      () => {console.log("End of list");});
    } else {
      let accountCode: string = this._accountInfo.accountCode;
      this.crudOperation.getShipmentListForCustomer(fromDate, toDate, accountCode).subscribe((data: Array<Shipment>) => {
          //this._shipmentList = new ShipmentList(); this._shipmentList.set_elm(data); this._shipmentList.set_length(length);
          /*! Make shipmentList available to other component who subscribe for it. */
          /*
          this._shipmentList.length = data.length;
          for(let idx: number = 0; idx < data.length; ++idx) {
            this._shipmentList.push(data[idx]);
          }*/

          this._shipmentList = new ShipmentList(data, data.length);
          this.data.setShipmentListInfo(this._shipmentList);
          this.m_displayList = "true";
      },
      (error: any) => { this.m_displayList = "false";},
      () => {console.log("End of list");});

    }
  }
}
