import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {formatDate} from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Account, ExcelDataFormat, ExcelDataForShipment, SenderInformation, Shipment, ShipmentList } from 'src/commonDS/DS';
import { CrudService } from 'src/rest-api/crud.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-shipment-batch-upload',
  templateUrl: './shipment-batch-upload.component.html',
  styleUrls: ['./shipment-batch-upload.component.scss']
})
export class ShipmentBatchUploadComponent implements OnInit {
  convertedData: string;
  _accountInfo!: Account;
  _subscription!: Subscription;
  _shipmentInfo!:Shipment;
  _shipmentList!: ShipmentList;
  _customerInfo!: SenderInformation;
  _excelDataList: Array<ExcelDataFormat> = new Array<ExcelDataFormat>();

  isBtnEnabled: boolean = false;

  tmp!:any;
  shipmentBatching: Array<string> = [];
  shipmentBatchUploadForm: FormGroup;
  public excel: Array<ExcelDataForShipment> = [];
  private accCode: string ;

  file!: File;
  constructor(private fb: FormBuilder, 
              private crudOperation: CrudService,
              private data: DataService) {
              
    
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
      //console.log("Array of shipment " + arrStr);
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
      let aCode: string = '';
      let rows: ExcelDataFormat[] = [];
      const selectedFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      //fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload = (event) => {
        let binaryData = event.target?.result;
        /** wb -- workBook of excel sheet */
        let wb = XLSX.read(binaryData, {type:'binary'});
        this.tmp = fileReader.result;
        wb.SheetNames.forEach(sheet => {

          let data = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
          rows = <ExcelDataFormat[]>data;
          //console.log("data :" + rows.length);
          //console.log("contents: " + rows[0].accountCode);
          //this.convertedData = JSON.stringify(data);
          //console.log(JSON.stringify(data));

          for(let idx:number = 0; idx < rows.length; ++idx) {
            //console.log("contents: " + rows[idx].accountCode);
            //console.log("contents: " + rows[idx].referenceNo);
            this._excelDataList[idx] = new ExcelDataFormat(rows[idx]);
          }

          /*
          for(let idx: number =0; idx < rows.length; ++idx) {
            console.log("excelDataFormat " + this._excelDataList[idx].referenceNo);
          }
          */

        });
      }

      fileReader.onloadend = (event) => {
        //console.log("As Text: " + fileReader.result);
        //let rec = this.excel.pop();
        //console.log("file is loaded : " + rec?.accountCode);
        //console.log("file is loaded : " + rec?.shipment);
        //let arr: string[] = rec?.shipment;

        //let arr: any = JSON.parse(JSON.stringify(rec?.shipment));

        //for(let elm of arr) {
          //console.log("elm " + elm);
        //}

        
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
}
