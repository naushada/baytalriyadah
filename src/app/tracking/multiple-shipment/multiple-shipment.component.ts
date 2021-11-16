import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiple-shipment',
  templateUrl: './multiple-shipment.component.html',
  styleUrls: ['./multiple-shipment.component.scss']
})
export class MultipleShipmentComponent implements OnInit {

  multipleTrackingShipmentForm: FormGroup;
  constructor(private fb:FormBuilder) { 
    this.multipleTrackingShipmentForm = this.fb.group({
      trackingNo:'',
      altRefNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
