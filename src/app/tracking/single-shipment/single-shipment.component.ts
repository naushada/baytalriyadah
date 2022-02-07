import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Account, Shipment } from 'src/commonDS/DS';
import { CrudService } from 'src/rest-api/crud.service';

@Component({
  selector: 'app-single-shipment',
  templateUrl: './single-shipment.component.html',
  styleUrls: ['./single-shipment.component.scss']
})
export class SingleShipmentComponent implements OnInit, OnDestroy {

  displayResult: string = "";
  shipmentInfo!: Shipment;
  _accountInfo!:Account;
  subscription!: Subscription;

  singleTrackingShipmentForm: FormGroup;
  constructor(private fb: FormBuilder, private crudOperation: CrudService, private sharedShipmentInfo: DataService) { 
    this.subscription = this.sharedShipmentInfo.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);

    this.singleTrackingShipmentForm = this.fb.group({
      trackingNo:'',
      senderRefNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let awbNo: string = this.singleTrackingShipmentForm.controls['trackingNo'].value;
    let senderRef: string = this.singleTrackingShipmentForm.controls['senderRefNo'].value;

    if(this._accountInfo.role == "Employee") {
      console.log("awbNo.length :" + awbNo.length);
      if(awbNo.length > 0) {
        if(awbNo.startsWith("5497") == true) {
          this.crudOperation.getShipmentInfoByShipmentNo(awbNo) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.sharedShipmentInfo.setShipmentInfo(this.shipmentInfo);
                                this.displayResult = "True";
                              },
                              error => {
                                alert("Invalid Shipment Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});
        } else {
          this.crudOperation.getShipmentInfoByAltRefNo(awbNo) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.sharedShipmentInfo.setShipmentInfo(this.shipmentInfo);
                                this.displayResult = "True";
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});
        }
      } else if(senderRef.length > 0) {
        this.crudOperation.getShipmentInfoBySenderRefNo(senderRef).subscribe(
          (rsp: Shipment) =>
          {
              this.shipmentInfo = new Shipment(rsp);
              this.sharedShipmentInfo.setShipmentInfo(this.shipmentInfo);
              this.displayResult = "True";

          },
          (error) => {},
          () => {});
      }
    } else {
      let acCode: string = this._accountInfo.accountCode;
      if(awbNo.length > 0) {
        if(awbNo.startsWith("5497") == true) {
          this.crudOperation.getShipmentInfoByShipmentNoForCustomer(awbNo, acCode) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.sharedShipmentInfo.setShipmentInfo(this.shipmentInfo);
                                this.displayResult = "True";
                              },
                              error => {
                                alert("Invalid Shipment Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});
        } else {
          this.crudOperation.getShipmentInfoByAltRefNoForCustomer(awbNo, acCode) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.sharedShipmentInfo.setShipmentInfo(this.shipmentInfo);
                                this.displayResult = "True";
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});
        }
      } else if(senderRef.length > 0) {
          this.crudOperation.getShipmentInfoBySenderRefNoForCustomer(senderRef, acCode).subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.sharedShipmentInfo.setShipmentInfo(this.shipmentInfo);
                                this.displayResult = "True";
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});

      }
    }
  } /** end of onSubmit */

  onReset() : void {
    this.singleTrackingShipmentForm.controls['trackingNo'].setValue("");
    this.singleTrackingShipmentForm.controls['senderRefNo'].setValue("");
    this.displayResult = "False";
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
