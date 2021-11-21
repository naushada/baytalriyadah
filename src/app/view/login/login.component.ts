import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { CrudService } from 'src/rest-api/crud.service';
import {Account } from '../../../commonDS/DS'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  accountInfo! : Account;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private crudOperation: CrudService, private router:Router, private sharedAccountInfo: DataService) { 
    this.loginForm = this.fb.group({
      userId:'',
      password:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.crudOperation.onLogin(this.loginForm.controls['userId'].value, 
                              this.loginForm.controls['password'].value).subscribe(
                              (rsp : Account) => {console.log(rsp); this.accountInfo = new Account(rsp); console.log(this.accountInfo);
                                this.sharedAccountInfo.setAccountInfo(this.accountInfo);
                                if (this.accountInfo.role == "Employee") {
                                  console.log("I am employee");
                                  this.router.navigate(["/bayt"]);
                                } else {
                                  //this.router.navigate(["shipping/shipping-main/ShippingMainComponent"]);
                                }
                              },
                              error => {
                                console.log("Error retrieving expenses");
                                console.error(error);
                              });
  }
}
