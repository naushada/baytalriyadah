import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit {

  shipmentListForm: FormGroup;
  constructor(private fb:FormBuilder) { 
    this.shipmentListForm = this.fb.group({
      fromDate: new Date(),
      toDate: new Date()
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }
}
