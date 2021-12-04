import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {formatDate} from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Account, ExcelDataFormat, ExcelDataForShipment, SenderInformation, Shipment, ShipmentList } from 'src/commonDS/DS';
import { CrudService } from 'src/rest-api/crud.service';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/upload/excel.service';


@Component({
  selector: 'app-shipment-batch-upload',
  templateUrl: './shipment-batch-upload.component.html',
  styleUrls: ['./shipment-batch-upload.component.scss']
})
export class ShipmentBatchUploadComponent implements OnInit {
  convertedData: string;
  _accountInfo!: Account;
  _subscription!: Subscription;
  _customerInfo!: SenderInformation;
  _excelDataList: Array<ExcelDataFormat> = new Array<ExcelDataFormat>();

  isBtnEnabled: boolean = false;

  shipmentBatchUploadForm: FormGroup;
  private accCode: string ;

  file!: File;
  constructor(private fb: FormBuilder, 
              private crudOperation: CrudService,
              private data: DataService,
              private xl: ExcelService) {
              
    
    this._subscription = this.data.currentAccountInfo.subscribe((aInfo: Account) => this._accountInfo = aInfo);
    this.convertedData = "";
    this.accCode = "";
    this.shipmentBatchUploadForm = this.fb.group({
      batchUpload:''
    });
  }

  ngOnInit(): void {
  }

    onSubmit() {

      let listOfObj = new Array<string>();
      for(let row of this._excelDataList) {
        let req:string = this.fillShipmentInfo(row);
        listOfObj.push(req);
      }

      let arrStr = JSON.stringify(listOfObj);
      this.crudOperation.createBulkShipment(arrStr).subscribe(()=> {alert("created successfully");}); 
    }

    fillShipmentInfo(from: any): string {

     let shInfo: FormGroup = this.fb.group({
        activity: this.fb.array([{date: formatDate(new Date(), 'dd/MM/yyyy', 'en'), event: "Document Created", 
                                  time:new Date().getHours()+':'+new Date().getMinutes(),notes:'', driver:'', 
                                  updatedBy:this._accountInfo.name}]),
        createdOn:formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        createdBy: this._accountInfo.name,
        shipmentNo:'[System Generated]',
        autogenerate:true,
        altrefNo: from.altRefNo,
        /** Sender Informat */
        referenceNo: from.referenceNo,
        accountCode: from.accountCode,
        companyName: this._customerInfo && this._customerInfo.aInfo.companyName || this._accountInfo.companyName,
        name: this._customerInfo && this._customerInfo.aInfo.name || this._accountInfo.name,
        country: this._customerInfo && this._customerInfo.aInfo.country || this._accountInfo.country,
        address: this._customerInfo && this._customerInfo.aInfo.address || this._accountInfo.address,
        city: this._customerInfo && this._customerInfo.aInfo.city ||this._accountInfo.city,
        state: this._customerInfo && this._customerInfo.aInfo.state || this._accountInfo.state,
        postalCode: this._customerInfo && this._customerInfo.aInfo.postalCode || this._accountInfo.postalCode,
        contact: this._customerInfo && this._customerInfo.aInfo.contact || this._accountInfo.contact,
        phone: from.phone,
        email: this._customerInfo && this._customerInfo.aInfo.email || this._accountInfo.email,
        recvCountryTaxId: from.recvCountryTaxId,
        /** Shipment Information */
        serviceType: from.serviceType,
        noOfitems: from.noOfItems,
        description: from.description,
        goodsValue: from.goodsValue,
        customValue: from.customValue,
        weight: from.weight,
        weightUnit: from.weightUnit,
        cubicWeight: from.cubicWeight,
        codAmount: from.codAmount,
        vat: from.vat,
        currency: from.currency,

        /** Receiver Information */
        sku: from.sku,
        receiverName: from.receiverName,
        receiverCountry: from.receiverCountry,
        receiverAddress: from.receiverAddress,
        receiverCity: from.receiverCity,
        receiverState: from.receiverState,
        receiverPostalCode: from.receiverPostalCode,
        receiverContact: from.receiverContact,
        receiverPhone: from.receiverPhone,
        receiverEmail: from.receiverEmail
      });

      return(shInfo.value);
    }
    set accountCode(ac: string)  {
      this.accCode = ac;
    }

    get accountCoe() : string {
      return(this.accCode);
    }

    getAccountCode(event: any) : void {
      let rows: ExcelDataFormat[] = [];
      const selectedFile = event.target.files[0];
      console.log(selectedFile);
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);

      fileReader.onload = (event) => {
        let binaryData = event.target?.result;
        /** wb -- workBook of excel sheet */
        let wb = XLSX.read(binaryData, {type:'binary'});
        wb.SheetNames.forEach(sheet => {

          let data = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
          rows = <ExcelDataFormat[]>data;

          for(let idx:number = 0; idx < rows.length; ++idx) {
            this._excelDataList[idx] = new ExcelDataFormat(rows[idx]);
          }
        });
      }

      fileReader.onloadend = (event) => {
        if(this._accountInfo.role == "Employee") {

          this.crudOperation.getCustomerInfo(this._excelDataList[0].accountCode).subscribe(
            (data: Account) => {
              this._customerInfo = new SenderInformation(data);
              this.isBtnEnabled = true;
            },
            (error) => {alert("Invalid AccountCode " + this._excelDataList[0].accountCode);},
            () => {});
        } else {
          //this.fillShipmentInfo(this._accountInfo);
          this.isBtnEnabled = true;
        }
      }

      fileReader.onerror = (event) => {
        alert("Excel File is invalid: ");
      }
    }

    fileUpload(event: any) {
      this.getAccountCode(event);
      let acc = this.accountCode;
      console.log("acc: " + acc);
      console.log("files" + event.target.files);
      this.file = event.target.files[0];

      const fileReader = new FileReader();
      fileReader.readAsBinaryString(this.file);

      fileReader.onload = (event) => {
        let binaryData = event.target?.result;
        /** wb -- workBook of excel sheet */
        let wb = XLSX.read(binaryData, {type:'binary'});
        wb.SheetNames.forEach(sheet => {
          let data: any = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
          this.convertedData = JSON.stringify(data);
          
          JSON.parse(this.convertedData).forEach((row: any) => {
            console.log(row.accountCode);
            let shInfo: string = this.fillShipmentInfo(row); 
          });
        });
        console.log(wb);
      }
    }

    excelFileUpload(event: any) {
      this.getAccountCode(event);
    }

  onCreateShipmentTemplate(): void {
    this.xl.createShipmentTemplate();
  }
}
