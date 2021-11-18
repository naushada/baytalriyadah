import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.scss']
})
export class CreateInventoryComponent implements OnInit {

  createInventoryForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createInventoryForm = this.fb.group({
      productName:'',
      productId:'',
      quantity:'',
      createdOn:new Date(),
      bulkCreate:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
