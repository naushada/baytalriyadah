import { Component, OnInit } from '@angular/core';
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
export class SingleShipmentComponent implements OnInit {

  displayResult: string = "";
  shipmentInfo!: Shipment;
  _accountInfo!:Account;
  subscription!: Subscription;

  singleTrackingShipmentForm: FormGroup;
  constructor(private fb: FormBuilder, private crudOperation: CrudService, private sharedShipmentInfo: DataService) { 
    this.subscription = this.sharedShipmentInfo.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);

    this.singleTrackingShipmentForm = this.fb.group({
      trackingNo:''
      /*
      altRefNo:''*/
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.crudOperation.getSingleShipment(this.singleTrackingShipmentForm.controls['trackingNo'].value, 
                              this.singleTrackingShipmentForm.controls['altRefNo'].value, this._accountInfo.accountCode).subscribe(
                              (rsp : Shipment) => {console.log(rsp); this.shipmentInfo = new Shipment(rsp); console.log(this.shipmentInfo);
                                this.sharedShipmentInfo.setShipmentInfo(this.shipmentInfo);
                                this.displayResult = "True";
                              },
                              error => {
                                console.log("Error retrieving expenses");
                                console.error(error);
                              });

  }
}
