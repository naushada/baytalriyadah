import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-shipment',
  templateUrl: './delete-shipment.component.html',
  styleUrls: ['./delete-shipment.component.scss']
})
export class DeleteShipmentComponent implements OnInit {

  deleteShipmentForm: FormGroup;
  constructor(private fb:FormBuilder) { 
    this.deleteShipmentForm = this.fb.group({
      shipmentNo:'',
      accountCode:'',
      altRefNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
