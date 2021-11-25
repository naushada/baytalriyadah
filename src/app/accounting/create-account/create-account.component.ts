import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/rest-api/crud.service';
import { Account, CountryName} from '../../../commonDS/DS'
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
  constructor(private fb: FormBuilder, private httpc: HttpClient, private crudOperation: CrudService) { 
    this.accountForm = this.fb.group({
      accountCode:'',
      autogenerate:false,
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
    let newAccount = new Account(this.accountForm.value);
    this.crudOperation.createAccount(newAccount).subscribe((data) => {console.log(data);}, (error: any) => {}, () => {alert("Account is created successfully");});

  }

  onCheckboxSelect() {
    let status: boolean = false;
    status = this.accountForm.controls['autogenerate'].value;
    if(true == status) {
      this.accountForm.controls['accountCode'].setValue("");
    } else {
      this.accountForm.controls['accountCode'].setValue("[System Generated]");
    }
  }
}
