import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Account, Shipment, ShipmentList } from 'src/commonDS/DS';
import { CrudService } from 'src/rest-api/crud.service';

@Component({
  selector: 'app-multiple-shipment',
  templateUrl: './multiple-shipment.component.html',
  styleUrls: ['./multiple-shipment.component.scss']
})
export class MultipleShipmentComponent implements OnInit {

  _accountInfo!: Account;
  subscription: Subscription;
  shipmentInfoList!: ShipmentList;
  showComponent:boolean = false;

  multipleTrackingShipmentForm: FormGroup;
  constructor(private fb:FormBuilder, private sharedInfo: DataService, private crudOperation:CrudService) { 
    this.subscription = this.sharedInfo.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
    this.multipleTrackingShipmentForm = this.fb.group({
      trackingNo:'',
      senderRefNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let awbNo: string = this.multipleTrackingShipmentForm.controls['trackingNo'].value;
    console.log("AWB List " + awbNo);
    let awbList = new Array<string>();
    awbList = awbNo.split("\n");

    /*
    awbNo.split("\n").forEach((item: string) => {
      awbList.push("\"" + item + "\"");
    });*/

    console.log("AAA " + awbList);
    if(this._accountInfo.role == "Employee") {
      if(awbList[0].startsWith("05497") == true) {
        this.crudOperation.getShipmentInfoByAwbList(awbList) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.sharedInfo.setShipmentListInfo(this.shipmentInfoList);
                                this.showComponent = true;
                                alert("Number of AWB Records are: " + this.shipmentInfoList.m_length );
                              },
                              error => {
                                alert("Invalid Shipment Number " + awbList);
                              },
                              /**Operation is executed successfully */
                              () => {});
      } else {
        this.crudOperation.getShipmentInfoByAltRefList(awbList) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.sharedInfo.setShipmentListInfo(this.shipmentInfoList);
                                this.showComponent = true;
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});

      }
      
    } else {
      
      let acCode: string = this._accountInfo.accountCode;
      if(awbList[0].startsWith("05497") == true) {
        this.crudOperation.getShipmentInfoByAwbListForCustomer(awbList, acCode) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.sharedInfo.setShipmentListInfo(this.shipmentInfoList);
                                this.showComponent = true;
                              },
                              error => {
                                alert("Invalid Shipment Number " + awbNo);
                              },
                              () => {});
      } else {
        this.crudOperation.getShipmentInfoByAltRefListForCustomer(awbList, acCode) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.sharedInfo.setShipmentListInfo(this.shipmentInfoList);
                                this.showComponent = true;
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbList);
                              },
                              () => {});

      }
    }
  }
}
