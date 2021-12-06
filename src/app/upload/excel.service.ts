import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
//import { FileSaver } from 'file-saver';
import { ExcelHeading } from 'src/commonDS/DS';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {

  constructor() { }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


    fileName= 'ShipmentTemplate.xlsx';  

    exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }


templateToExcel:string[][] = [ExcelHeading,[]];

  createShipmentTemplate()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.aoa_to_sheet(this.templateToExcel);

    let wscols = [];
    for (var i = 0; i < ExcelHeading.length; i++) {
      wscols.push({ wch: ExcelHeading[i].length + 10 })
    }

    ws["!cols"] = wscols;
    /*
    ws.eachCell((cell:any, number:any) => {
      cell.fill = {
        type: 'text',
        fgColor: {argb:'FFFFFF00'},
        bgColor: {argb:'FF0000FF'}
      }
    });*/

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Shipment');
    XLSX.writeFile(wb, this.fileName);
    FileSaver.saveAs(this.fileName);
  }


}
