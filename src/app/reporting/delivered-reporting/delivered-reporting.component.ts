import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delivered-reporting',
  templateUrl: './delivered-reporting.component.html',
  styleUrls: ['./delivered-reporting.component.scss']
})
export class DeliveredReportingComponent implements OnInit {

  deliveredReportingForm: FormGroup;
  constructor(private fb:FormBuilder) { 
    this.deliveredReportingForm = this.fb.group({
      cc:'',
      cod:'',
      rtoAmount:'',
      awbNo:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
