import { Component, Input, OnInit } from '@angular/core';
import { CountryName } from '../../../commonDS/DS'
import { Currency, ServiceType, Events, Role } from '../../../commonDS/DS'

@Component({
  selector: 'app-my-new-shipment',
  templateUrl: './my-new-shipment.component.html',
  styleUrls: ['./my-new-shipment.component.scss']
})
export class MyNewShipmentComponent implements OnInit {

  cntName = CountryName;
  constructor() { }
  
  ngOnInit(): void {
  }

}
