import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ShipmentBatchUploadComponent implements OnInit, OnDestroy {
  convertedData: string;
  _accountInfo!: Account;
  _subscription!: Subscription;
  _excelDataList: Array<ExcelDataFormat> = new Array<ExcelDataFormat>();
  _custInfoList: Map<string, Account> = new Map<string, Account>(); 
  //_custInfoList: Map<string, SenderInformation> = new Map<string, SenderInformation>(); 
  //_custInfoList = new Map(); 
  _accountCodeList: Array<string> = new Array<string>();

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

  getRidofDupElement(data: Array<string>) {
    return data.filter((value, idx) => data.indexOf(value) === idx);
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
    this.crudOperation.createBulkShipment(arrStr).subscribe((rsp:any) => { 
      let record: any; 
      let jObj = JSON.stringify(rsp);
      record = JSON.parse(jObj); alert("Shipments Create are: " + record.createdShipments);
    });

    this._custInfoList.clear();
  }

  fillShipmentInfo(from: any): string {
    let acc: string = from.accountCode;
    let customerInfo:Account = new Account();
    //let customerInfo: Account  = <Account>this._custInfoList.get(acc);

    for (let [key, value] of this._custInfoList) {
      if(key == acc) {
        customerInfo = value;
        break;
      }
    }

    /*
    console.log(customerInfo);
    this._custInfoList.forEach((value: Account, key: string) => {
      console.log(key, value);
    });*/

    if(customerInfo) {

      let shInfo: FormGroup = this.fb.group({
          activity: this.fb.array([{date: formatDate(new Date(), 'dd/MM/yyyy', 'en'), event: "Document Created", 
                                  time:new Date().getHours()+':'+new Date().getMinutes(),notes:'', driver:'', 
                                  updatedBy:this._accountInfo.name, eventLocation:'Riyadh'}]),
          createdOn:formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          createdBy: this._accountInfo.name,
          shipmentNo:'[System Generated]',
          autogenerate:true,
          altRefNo: from.altRefNo,
          /** Sender Informat */
          referenceNo: from.referenceNo,
          accountCode: from.accountCode,
          companyName: customerInfo.companyName,
          name: from.name && from.name || customerInfo.name,
          country: customerInfo.country,
          address: customerInfo.address,
          city: customerInfo.city,
          state: customerInfo.state,
          postalCode: customerInfo.postalCode,
          contact: customerInfo.contact,
          phone: from.phone,
          email: customerInfo.email,
          recvCountryTaxId: from.recvCountryTaxId,
          /** Shipment Information */
          service: 'Non Document',
          noOfItems: '1',
          description: from.description,
          goodsValue: from.goodsValue,
          customValue: from.customValue,
          weight: from.weight,
          weightUnit: 'KG',
          cubicWeight: from.cubicWeight,
          codAmount: from.codAmount,
          vat: from.vat,
          currency: from.currency,
          sku: from.sku,

          /** Receiver Information */
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
      return("");
    }

    set accountCode(ac: string)  {
      this.accCode = ac;
    }

    get accountCoe() : string {
      return(this.accCode);
    }

    getAccountCode(event: any) : void {
      let rows: any[] = [];
      const selectedFile = event.target.files[0];
      //console.log(selectedFile);
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);

      fileReader.onload = (event) => {
        let binaryData = event.target?.result;
        /** wb -- workBook of excel sheet */
        let wb = XLSX.read(binaryData, {type:'binary'});
        wb.SheetNames.forEach(sheet => {

          let data = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
          rows = <any[]>data;
          console.log(rows);
          for(let idx:number = 0; idx < rows.length; ++idx) {
            this._excelDataList[idx] = new ExcelDataFormat(rows[idx]);
            this._accountCodeList.push(this._excelDataList[idx].accountCode);
          }
        });
      }

      fileReader.onloadend = (event) => {
        if(this._accountInfo.role == "Employee") {
          let uniq: Array<string> = this.getRidofDupElement(this._accountCodeList);
          for(let idx: number = 0; idx < uniq.length; ++idx) {
            this.crudOperation.getCustomerInfo(uniq[idx]).subscribe(
              (data: Account) => {
                //let customerInfo = new SenderInformation(data);
                this._custInfoList.set(data.accountCode, data);
                //console.log(this._custInfoList.has(data.accountCode));
              },
              (error) => {alert("Invalid AccountCode " + this._excelDataList[0].accountCode);},
              () => {
                this.isBtnEnabled = true;});
          }
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

  ngOnDestroy(): void {
      this._subscription.unsubscribe();
  }
}
