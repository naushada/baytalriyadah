import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onClick(option:string) : void {
    switch(option) {
      case 'Shipping':
        this.router.navigate(["shipping/ShippingMainComponent"]);
        break;
      case 'Tracking':
        this.router.navigate(["tracking/TrackingMainComponent"]);
        break;
      case 'Reporting':
        this.router.navigate(["reporting/ReportingMainComponent"]);
        break;
      case 'Accounting':
        this.router.navigate(["accounting/AccountingMainComponent"]);
        break;
    }
  }
}
