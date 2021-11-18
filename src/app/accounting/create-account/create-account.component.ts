import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryName, Shipment } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role} from '../../../commonDS/DS'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;

  accountForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.accountForm = this.fb.group({
      accountCode:'',
      accountPassword:'password',
      companyName:'',
      role:Role[0],
      name:'',
      address:'',
      city:'',
      state:'',
      postalCode:'',
      country:CountryName[0],
      contact:'',
      email:'',
      quotedAmount:'',
      currency:Currency[0],
      vat:'',
      tradingLicense:'',
      bankAccountNo:'',
      ibnNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
