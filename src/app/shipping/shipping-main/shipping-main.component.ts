import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-main',
  templateUrl: './shipping-main.component.html',
  styleUrls: ['./shipping-main.component.scss']
})
export class ShippingMainComponent implements OnInit {

  navOptionSelected: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
