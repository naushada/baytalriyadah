import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shipment-batch-upload',
  templateUrl: './shipment-batch-upload.component.html',
  styleUrls: ['./shipment-batch-upload.component.scss']
})
export class ShipmentBatchUploadComponent implements OnInit {

  shipmentBatchUploadForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.shipmentBatchUploadForm = this.fb.group({
      batchUpload:''
    });
  }

  ngOnInit(): void {
  }

    onSubmit() {

    }
}
