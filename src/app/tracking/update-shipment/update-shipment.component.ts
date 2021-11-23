import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { CrudService } from 'src/rest-api/crud.service';
import { Account, CountryName, Shipment } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

@Component({
  selector: 'app-update-shipment',
  templateUrl: './update-shipment.component.html',
  styleUrls: ['./update-shipment.component.scss']
})
export class UpdateShipmentComponent implements OnInit {

  _accountInfo!:Account;
  subscription!: Subscription;
  _shipmentInfo!: Shipment;

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  updateShipmentStatusForm: FormGroup;
  constructor(private fb: FormBuilder, private data: DataService, private crudOperation: CrudService) { 

    this.subscription = this.data.currentAccountInfo.subscribe((message: Account) => this._accountInfo = message);
    this.updateShipmentStatusForm = this.fb.group({
      event:this.EventList[0],
      date:'',
      time:'',
      notes:'',
      connote: '',
      eventLocation:'',
      driverName:'',
      updatedBy: this._accountInfo.name
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let awbNo: string = this.updateShipmentStatusForm.controls['connote'].value ;
    console.log(this.updateShipmentStatusForm.value);
    //let newShipment = new Shipment(this.updateShipmentStatusForm.value);
    //console.log(JSON.stringify(newShipment));
    this.crudOperation.updateShipment(awbNo, this._accountInfo.accountCode, this.updateShipmentStatusForm.value).subscribe((data) => {console.log(data);});
  }
}
