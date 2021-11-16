import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-single-shipment',
  templateUrl: './single-shipment.component.html',
  styleUrls: ['./single-shipment.component.scss']
})
export class SingleShipmentComponent implements OnInit {

    singleTrackingShipmentForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.singleTrackingShipmentForm = this.fb.group({
      trackingNo:'',
      altRefNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
