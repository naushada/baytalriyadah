import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-out-from-inventory',
  templateUrl: './out-from-inventory.component.html',
  styleUrls: ['./out-from-inventory.component.scss']
})
export class OutFromInventoryComponent implements OnInit {

  outFromInventoryForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.outFromInventoryForm = this.fb.group({
      productName:'',
      productId:'',
      quantity:'',
      remainingQuantity:'',
      outOn: new Date(),
      bulkOut:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
