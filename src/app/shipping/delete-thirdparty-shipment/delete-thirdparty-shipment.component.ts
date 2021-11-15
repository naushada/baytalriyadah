import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-thirdparty-shipment',
  templateUrl: './delete-thirdparty-shipment.component.html',
  styleUrls: ['./delete-thirdparty-shipment.component.scss']
})
export class DeleteThirdpartyShipmentComponent implements OnInit {

  deleteThirdPartyShipmentForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.deleteThirdPartyShipmentForm = this.fb.group({
      customerId:'',
      bookingId:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
