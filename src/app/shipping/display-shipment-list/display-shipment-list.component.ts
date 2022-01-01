import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Shipment, ShipmentList } from 'src/commonDS/DS';

import * as JsBarcode from "jsbarcode";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CrudService } from 'src/rest-api/crud.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-display-shipment-list',
  templateUrl: './display-shipment-list.component.html',
  styleUrls: ['./display-shipment-list.component.scss']
})
export class DisplayShipmentListComponent implements OnInit , OnDestroy{

  subscription: Subscription;
  _shipmentListInfo!: ShipmentList;
  selected: boolean[] = [];

  constructor(private data: DataService, private crudOperation: CrudService) { 
    let checkboxes = document.getElementsByName("shipment");
    for( let idx: number=0; idx < checkboxes.length; ++idx) {
      this.selected[idx] = false;
    }
    this.subscription = this.data.currentShipmentListInfo.subscribe(
          (message: ShipmentList) => {this._shipmentListInfo = message;});
  }

  ngOnInit(): void {
    
  }

  onSelectAll(event:any) {
    let checkboxes = document.getElementsByName("shipment");
    if(event.target.checked) {
      for(var i = 0; i <= checkboxes.length; i++)  
      {
        this.selected[i] = true;
      }
    } else {
      for(var i = 0; i <= checkboxes.length; i++)  
      {
        this.selected[i] = false;
      }
    }

  }

  onSingleSelect(event:any, idx: number) {
    if(event.target.checked)
      this.selected[idx] = true;
    else 
      this.selected[idx] = false;
  }

  /** Label A6 Generation  */
  Info = {
    title: 'A6 Label',
    author: 'Mohd Naushad Ahmed',
    subject: 'A6 Label for Shipment',
    keywords: 'A6 Label',
  };

  A6LabelContentsBody:Array<object> = new Array<object>();

  buildA6ContentsBody() {
    this.A6LabelContentsBody.length = 0;
    for(let idx:number = 1; idx < this.selected.length; ++idx) {
      if(!this.selected[idx]) {continue;}
      const elm:Shipment = this._shipmentListInfo.m_shipmentArray[idx -1]; 
      let ent = [
        {
          table: {
            headerRows: 0,
            widths: [ 100, '*'],
            heights: ['auto', 'auto', 'auto', 20, 'auto'],
            body: [
              [ {image:"data:image/png;base64,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", width:80, alignment: 'center', margin:[5, 20]}, {qr: 'To Be Updated', alignment: 'center', bold:false, fit:'50' }],
              [ {text: 'Date:' + elm.activity[0].date + ' '+ elm.activity[0].time}, {text: 'Destination: ' + elm.receiverCity +'\n' + 'Product Type: ' + elm.service, bold: true}],
              [ {text: 'Account Number: '+ elm.accountCode}, {image: this.textToBase64Barcode(elm.shipmentNo, 70), bold: false, alignment: 'center',rowSpan:2, width: 170}],
              [ { text: 'No. of Items: ' + elm.noOfItems + '\n' + 'Weight: '+ elm.weight + elm.weightUnit + '\n' + 'Goods Value: '+ elm.customValue, bold: false }, ''],
              [ { text: 'From:\n' + elm.companyName +'\n'+ 'Mobile:'+ elm.phone + '\n' + 'Country: '+ elm.country, bold: false }, {text: 'To:\n'+ elm.receiverName + '\n'+ 'Address: '+elm.receiverAddress+'\n'+'City: '+ elm.receiverCity+ '\n'+'Mobile: '+elm.receiverContact+'\n'+'Country:'+elm.receiverCountry, fontSize: 10}],
              [ {text: 'Description: ' + elm.description}, {image: this.textToBase64Barcode(elm.altRefNo, 70), bold:false, alignment:'center',rowSpan:2, width:170} ],
              [ {text: 'COD: '+ elm.currency + ' ' + elm.codAmount, bold: true}, ''],
            ]
          },
          pageBreak: 'after'
          /*
          pageBreakAfter: (currentNode:any, followingNodesOnPage:any, nodesOnNextPage:any, previousNodesOnPage:any) => {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
         }*/
        }
      ];

      this.A6LabelContentsBody.push(ent);
    }
  }

  A4LabelContentsBody:Array<object> = new Array<object>();

  buildA4ContentsBody() {
    this.A4LabelContentsBody.length = 0;
    for(let idx:number = 1; idx < this.selected.length; ++idx) {
      if(!this.selected[idx]) {continue;}
      const elm:Shipment = this._shipmentListInfo.m_shipmentArray[idx- 1]; 
      let ent = [
        {
          table: {
            headerRows: 0,
            widths: [ 200, '*'],
            body: [
              [ {image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAAbCAIAAABA2dLQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAABAFSURBVGje7Zp3WFTntsbP/+feeyzxJDE9OfGcFCtiQ1RijdhLPNHYu0ZPivEktsQak2ujDb1JL6KDOKgggoA0laYUpTelM3RhJPe3Z5u5w8wwM6jPyT/sZz3zwMze317f+t71rnd9e//pt76j7zDi+FNfCPqOPqD0HX1A6Tv+cKC0tHU+qm4pLJUXlxuwonJ56cPGh1XN9fK2js4nXV1G3bKrq6v9saLsUROXF5XJuZx/jbm2rb2zqhbHGrCH1c0trR0vJATNrR34wJgqZ555qMcdiuq6VsbBSioam1s6njzpMvJaZlfb0FZR2UxIDUW+sbyyiVA0Nj/WGXRuWi9vL65oxA3Olzc97lQ8Meg5A3I+cWD1W1o7DQMlJ7/+7Pmsn6zif7ZPPIZJdNtRSeIRScJJ1xSXwIzwmILCsgZuZsx6sxIFpQ3WZ29z+WHbBLegzPySeoMz4eCqAFnOgTNxP1rFe4bczc6vfX6UgNrUrErXwAzme9QuwTkgnbsYv7oaR0mFPPhy7mG7m0fsEn5xSrqV+QisGOGDEJO796ulEXkOfumn3G4dEyOv0yQJxx2S7LxTfUKzYpJLwZZCy9uWto7riSU4cMj25s8OiQmp5fKmdv0+kCGBslzcPnA67mzIvez8OsNAkcUULd4WOsjE5s1JjoMn2L9kajNglG4bONr2jYkO7091MV3otXLXpTtZlcZkOStxVJLwroXzq+MlL4+zGznPE/9AvcELY5JL1u6W9Rtu1X+k9fzN58Ou5z8nSkhH7rvnZOwwS4+/jrFjsn+b6mLvk0pOP9uA5MzUlQHiUC+Ptdt5+FpSeoXBq1rbOqWRD5btDB1q6YEDb5g7vjrBnuC8Ot5ey/hSwuDvWjj9Y6bbpOX+P5y4UVHZpOieZjX1bcccEt+b6vzXcXZvTXa090krf9Sk34eM3Kq134cPHm/ff7jVoq3SS9FFhoHCSQu2SP9nuNXgCZKPPnWbuTZo0bYL2MKtT038d/7mEIsVAR/MdHvD3AHX/z7d1d43rcyQQ/WN7RciHkxc5vvKOAkBxYAa41xLKG5oNID66KSSVbsu/fnj0/89zGrOxpCLUc8LFFYo+PL96auDiL7gzFi7QWPsFm+/cDEqr7PzSa+GovJm5FSv/k727hSnl0xtGYpP8sfa83ZlbYt+sFbWtGz/MeKjWW5AgeR89xPn93q2vyk/35rsNNjM/jUzB24hiy6oa2jrBpS6Vvj+7SlOA01tX5/oIPFONbguGTlVq3fLcPvPH5+Zv/lC2PVCw0AJjylevP1i/1E2IGD+lvNkydXYoiuxhRpGuQkOz92yP2LU/LODTG2Z5N6TsQ+K6vVzbHLGw6+PRrEwQ6a5zF4fPHGZH0B5e7LTN8euZ+ZWdyr0cf6N5NJ134f3G2kNk4HXS8/HKLB9bkHtuu8vk8Qffeo+Y03Q5OX+zALHSNOsvF7UNUoVa/OLYzKhgClJg7mbQpjUa2b2y78OC48p1FORQRiVl2x8a5Iji2r+T7+9p2J/dU4+4ZpywkXLXFPE75d8GfrhTDeS7YMZbh7n7lI4NBjluGPSkOkuryq5x8HPMKMQ/PU/XMaBfiNtFm0LlRnDKCJQuADAbtx7ldqp5wZnz9+dsSaw/yhrSOW749G5BXV6TmYCFFeSgGwjNBKf1H//GjN0tkD7wy09PEPuIaP+Y0CBsd2CMz+c5fbyOMmSL6XWnncQTJRRfKN8OPmnI+q7jNPniMrYlLJPvggAZ2af+e47FcfijVnk/cp4ydDZ7rt/iamoblb0oHuU6qQGjL5p7ghWAFbm/eqGpnYkdo/W0uEenMm6Qn47foq8GldUq8Eo3YGC8NJAkg6g3K/esOfKMwLldTMHLkbroVJ7Mv+w7Nkbzv1lpDUxIiK5hXV6ODYyvmj5V2EsMxFBlyBWYKbPdobyzQATm5XfXoqML1b0LCRfIFA6OhRxKWVzNpyDC9+f6kwG026kZ1dbrPAnWKwZfpIhHUYUIOgkK6+GJKEWgPhN+67CmtSCzfuu/mOGK7Cb9LmfX1h2U0uHTtTR7KRlV036HSgrd8loCzSkPRd2dT9oT+CAgpJ6RKFCq/PRAAo1obSikUZGj92++2jj3mcCilB6JjqiRfwuZiemlSemalsFqvubo9dRo/1RvuaOtt6ppT1QnNiwwR8QJtwzbVXgnXuVSASWx9k/g6JLWjMxVHpJz0LyBQKFjgn+wBO48POvLpKUCoXgIT0C02H8EXM80f8GZZNyVVp9L2Z/PNt9wGibsUu8XYMymRfLf/lG4cw1Qaj19yycFm+XkkLklU6gpOdUqRjli28v5RV36wEJHRQCaakb+Ght7xSsrVO5MdGlDRRUI7XvnSnOG/dcOe12i85Oj5G3FF8UEhnbO6C8NNr27cmOQy3d4WHLDecsNwRbrlcz4Ztzs9YFj5jriUNTVvgftLlJLJi2zmhC4/5hOVNXBr48VmIy/+wJ52QmQwiIXXL6w7X/DgfLKCnG9Jbe62lD5kUBBfb2lmZNXRXIHHHeyS9d1HpEnDWD2N6Z4oQ/MMGVG4X18jaDvRhVAOdpc+AVUhP3mVptfduBM/Gj5nnyE5L/tPut4nK5MUBB56mAAltU1jQftI7fdiACitp6IEK0Lw9G7jx0bftPkTsOXguLyq+ua9UBlBmuzIK5oMBAv8l8Lz02fI7nkOmu6F9i0kugmNpyj/eVQo/ucZile3fzGDbbgygjRSE3qg+FEL7VuQNBGSaDV+2SwRyMCSzUWZ2MpA8av9TndTNBSEKACEmdnP+igJKU9nDbjxEsDHFkwJSMh2Kus8DkKOpk+upAGA41uuNgZFp2pZ4OqKSi8bhjItEAJSy2NOIBtKT69XpiCeMTIqiLfKU90d4F0A8U/igorYeZaHbIW1Xvw7pgBHPINNcz7rdxQydQhEZhipPoAA0E4len8dNrE4SGiwEHmdr1DigDTQQlQVcCfveditU2epyvj0ShSenrACx4T0yrgBU1O53ffiNfgZEgG8fa0RfQU+QU1IEGSjt270FN/O1yahwo4YQxi71JPtCjjbnnBwpchU781Sl53BIfOuG/T3c5Zp94I6VU5Ux2Xu25y7ms1uvK4CJFXYMyKnpQggCI7nrB1vNIE2K1Zne4LKaAlBCHwqjOe07cYOKDlSvxw8lY5IhGmTDAKIonZY8at+6/OmfjuU/XB/MpmukCL9oruIrO9H9dUoq6c5UGo1h8EbBsZyiJClnqMhnCiPjD9OTGwN4yCqIGJJL9iAmdMhaeoHYSR/Kv3whr1vhHq/j84nptOolOKgFPAqjHSUbO9Vy6I/Tbn6N3Hry2Q2n/Ohz1r0NRJBxAGTzeHl8/WRlAljdr7d1pAiW64Bla4rjbZfM2hxBBQvzhTFfCB4FD46Iz/AHJ4wxZywncCAWD2tDeOKYoACCuhVbJyPcsnOdtPr/lQATT2fF0apFfHY5asl0K30CWLCqs6RyYoTEvHUBR0yigCpKjn7h5p5x04jNBad/9HD16gRdjgoOTrppFTSVmha25KU4kA5AtKGlgZG3LK27IL25gjsyUFUeb9r7rmSh0PahrperWaV1RCcXLv76ImMUnSjUna4wGYfxkFc+vjEa7SB4T/X6jrBlfZShKcZMK8UWrRbyEBkqr0+4GlG3S3gIFb6nlOw5do5gKfDsBZ2wHmtgonVH5Y81ccIbSIzozZJrzgTNxdCIao9HFOPimT1jqI/I2pEJ1J8rqQ/VTbl4zL855c5JAUeAyOrFEu+uZrNb10Ayq45I4U4g1stTK4/bEZb4MDlBOuPQIFFV7XC7s3nYxrE6DtwDrhr3Puo/CZTrXXn0OF64+WLDlPFL5NTMHuDcjp1ojmp4hdy1WBMA371g4mf/T79N1wbPWBkNCGsb35DHs96a5A/flD5/Q7Kra1p6AsmDLhdBrwv6pAVPrHatrW4PDc00XeuEqBX7CUl/aY8q/hiczVgfhzPRVgZAfpMIaQ4fu5zLV+3a0OUQLM5GvrC7ezl4vzItrNUZD73M5i8qKMhRn7j8dV1P3/4W1rV1BhFVAWfHNJeoy6NE/L6rzhM98gCYOnHIzABRUV0Wl4Q23DXueCSgDlM96UKnWnrdDrtzXaQGXcuDYMQu9SE3YYsv+q/fu16gPBVXypbjHP3dTiJ1XqjQyLzQyT9rd+IZVZ0D6ZxaSlpKMp6mLTipVqO3VikCBfviV0O86Hu0WnNmTURP5DArPBR/AhaKDhFqzWwa7QhWLtkttvVIvXsvXdkaqdMY3NJsV/UDZzL8/zYUSnJFTJUpskAeN00iLomry535QjjiFUF1DMS8H3zSSBBxw61lrg/iGtla1M/ugqG76mkB+BSuU3V+dk10CM/RMDWMiw+Z4EChErqOfQBh/wM6s+KznL8OtBpsJT3DMlvlOXRVAk9zdAjEaSE5gdLgX6XTCJbmoTK7q/qtqW+iZR8zzZGk/nOlmc/aO/odt5D66ctPeK0Qf/v9gputh25sMqKIE8VnPfw0984qyJaGCmCzwMllwVqeNnMenF7qB2keC5pc0nHJLeWeyI9UBQU1G6t+sbGntgDMWbrsAEeLMcEuPI3YJFZXNYI7mDg2L4BBz6asjUWlZVXqGgooeVTcj4YdaenB3qOWLb8Lu3q8RtxIIFJ4ARGDHvPh1xFxP9MfoHuYlmtBvmguI5zTa49o/5FmP+tNjXBFVBbfsZqMFg/qgU9gPGlj3/eVUtafHMGpkfBHEO0gpuJZ+GUre6NxxUj/qGtoDZblEilQYYGJLaQiU5ahYWnx6PGCE1RvK8vTK+KePFXXaQKXowTEUAKKb5J636Xz/EVaDTG3pjRNSyw1vt7R0OAemw/BEgNvBYbG3ymjrbmU+AhygB6DABJCWwtBrCUwcPgN2jIP6ofBRDlQ0wI3cgjKpU+LjIXgCz/VMDRNEj7kjxXHj3itoGo3dhG5Pjyf17ulxP+XT4zBjGCU7v84z5B50elSSgB3pyeyeGlQhiy7AFfX3UUiXiPiiEy4p+07FUUTRvCqy1U8qsI63NOuQ7c0DVvFczsgdvz8qhPApdlSEI/odU9phO+GTYldZ08JKxCSV/uKYJLx0IknU2cbrZoKaFq8L9xjnoDUXJlD76uXt6D5Kyf7TsYRIGvGgtMLwOwldyhIju15w0iWF3hCi9Q/LUXXdqGw8jE4slfikHRajasTsCA5ZREy095xorKISSqg+3IiWhy5J3mj4fZQAWQ5h33cq1sPI91FQag+rlW98Kd9hM2BlciBSJ2/XaCCFB6r1rcUVjeCdtW9obDfyBTjQxtKKr1oVlzfSp6g2HgAfPxUY7RifUG5HhwKhUydv499C5RtfTc2PjXw1iUkJzggXCu+/MQhCkssZtkD5oh25a5Am1fiyjVCo3tBTf5WOKcqbHlPaRLeNmR1DERydL4spxDfcfp9vr95wK3j69qARb7j1HX2H9tEHlL6jDyh9Rx9Q+o7/8PF/hI6ssrBjdUIAAAAASUVORK5CYII=", width:80, margin:[5,20], alignment: 'center'}, {qr: 'To Be Updated', alignment: 'center', bold:false, fit:'50' }],
              [ {text: 'Date:' + elm.activity[0].date + ' '+ elm.activity[0].time}, {text: 'Destination:' + elm.receiverCity +'\n' + 'Product Type:' + elm.service, bold: true}],
              [ {text: 'Account Number:'+ elm.accountCode}, {image: this.textToBase64Barcode(elm.shipmentNo, 70), bold: false, alignment: 'center',rowSpan:2, width: 170}],
              [ { text: 'No. of Items: ' + elm.noOfItems + '\n' + 'Weight: '+ elm.weight + elm.weightUnit + '\n' + 'Goods Value: '+ elm.customValue, bold: false }, ''],
              [ { text: 'From:\n' + elm.companyName +'\n'+ 'Mobile:'+ elm.phone + '\n' + 'Country: '+ elm.country, bold: false }, {text: 'To:\n'+ elm.receiverName + '\n'+ 'Address:'+elm.receiverAddress+'\n'+'City:'+ elm.receiverCity+ '\n'+'Mobile:'+elm.receiverContact+'\n'+'Country:'+elm.receiverCountry}],
              [ {text: 'Description:' + elm.description}, {image: this.textToBase64Barcode(elm.altRefNo , 70), bold:false, alignment:'center',rowSpan:2, width:170} ],
              [ {text: 'COD: '+ elm.currency +' '+elm.codAmount, bold: true}, ''],
            ]
          },
          pageBreak: 'after'
        }
      ];

      this.A4LabelContentsBody.push(ent);
    }
  }


  docDefinitionA6 = {
    info: this.Info,
    pageSize: "A6",
    pageMargins: 5,
    content: this.A6LabelContentsBody,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      defaultStyle: {
        fontSize: 8,
      }
    }
  };

  docDefinitionA4 = {
    info: this.Info,
    pageMargins: 10,
    content: this.A4LabelContentsBody,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      rH: {
        height: 100,
        fontSize: 10
      }
    }
  };

  textToBase64Barcode(text: string, ht:number, fSize: number = 20) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE128", height: ht, fontOptions: 'bold', fontSize: fSize});
    return canvas.toDataURL("image/png");
  }

  generatePdf(pgType: string) {
    if('A6' == pgType) {
      this.buildA6ContentsBody();
      pdfMake.createPdf(this.docDefinitionA6).download( pgType + "-label");
    } else {
      this.buildA4ContentsBody();
      pdfMake.createPdf(this.docDefinitionA4).download( pgType + "-label");
    }
  }

  onDeleteAWB() {
    let elm:string;
    let awbList:Array<string> = new Array<string>();
    for(let idx:number = 1; idx < this.selected.length; ++idx) {
      if(!this.selected[idx]) {continue;}
      elm = this._shipmentListInfo.m_shipmentArray[idx -1].shipmentNo;
      awbList.push(elm);
    }

    this.crudOperation.onDeleteShipment(awbList).subscribe((rsp) => {
      alert("Shipment(s) is/are Delete successfully.");
    },
    (error) => {
      alert("Shipment deletion failed");
    },
    () => {});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
