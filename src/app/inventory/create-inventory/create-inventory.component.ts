import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {formatDate} from '@angular/common';

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
      createdOn:[formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en')],
      bulkCreate:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
