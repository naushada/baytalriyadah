import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Shipment, Account, SenderInformation, ShipmentStatus } from 'src/commonDS/DS';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  //apiURL = 'http://localhost:8080';
  apiURL = 'https://logistics-sw.herokuapp.com'

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  createShipment(newShipment:Shipment) : Observable<Shipment> {
    console.log(JSON.stringify(newShipment));

    return this.http.post<Shipment>(this.apiURL + '/api/shipping', JSON.stringify(newShipment), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  createBulkShipment(newShipment:string) : Observable<any> {
    //console.log(JSON.stringify(newShipment));

    return this.http.post<Shipment>(this.apiURL + '/api/bulk/shipping', newShipment, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }


  updateShipment(awbNo: string, data: ShipmentStatus) : Observable<any> {
    let param = `shipmentNo=${awbNo}`;
    const options = {params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    let uri: string = this.apiURL + '/api/shipment';
    return this.http.put<any>(uri, JSON.stringify(data), options)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  updateShipmentCustomer(awbNo: string, accountCode: string, data: ShipmentStatus) : Observable<any> {
    let param = `accountCode=${accountCode}&shipmentNo=${awbNo}`;
    const options = {params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    let uri: string = this.apiURL + '/api/shipment';
    return this.http.put<any>(uri, JSON.stringify(data), options)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );

  }
  getSingleShipment(awb:string): Observable<Shipment> {
    let param = `shipmentNo=${awb}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/shipment';
    return this.http.get<Shipment>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentList(fromDate:string, toDate: string): Observable<Shipment[]> {
    let param = `fromDate=${fromDate}&toDate=${toDate}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/shipmentlist';
    return this.http.get<Shipment[]>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));

  }

  createAccount(newAccount:Account) : Observable<Account> {
    console.log(JSON.stringify(newAccount));

    return this.http.post<Account>(this.apiURL + '/api/account', JSON.stringify(newAccount), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }


  onLogin(userId: string, password: string) : Observable<Account> {

    let param = `userId=${userId}&password=${password}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/login';
    return this.http.get<Account>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  updateAccount() {

  }

  getCustomerInfo(accountCode: string): Observable<Account> {

    let param = `accountCode=${accountCode}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/account';
    return this.http.get<Account>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getAccountCodeList(): Observable<Account[]> {

    let uri: string = this.apiURL + '/api/accountlist';
    return this.http.get<Account[]>(uri)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }


  getShipmentInfoByAltRefNo(altRefNo: string): Observable<Shipment> {

    let param = `altRefNo=${altRefNo}`;

    const options = {params: new HttpParams({fromString: param}),
                    };

    let uri: string = this.apiURL + '/api/altrefno';
    return this.http.get<Shipment>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentInfoByShipmentNo(awbNo: string): Observable<Shipment> {

    let param = `shipmentNo=${awbNo}`;

    const options = { params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/awbno';
    return this.http.get<Shipment>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentInfoByAwbList(awb:Array<string>): Observable<Shipment[]> {

    let param = `shipmentNo=${awb}`;
    console.log("param" + param);
    const options = { params: new HttpParams({fromString: param})};
    let uri: string = this.apiURL + '/api/awbnolist';
    return this.http.get<Shipment[]>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentInfoByAltRefList(awb:Array<string>): Observable<Shipment[]> {
    let param = `shipmentNo=${awb}`;

    const options = { params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/altrefnolist';
    return this.http.get<Shipment[]>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentInfoByAccountCodeList(fromDate: string, toDate: string, country:string, ac:Array<string>): Observable<Shipment[]> {

    let param = `accountCode=${ac}&fromDate=${fromDate}&toDate=${toDate}&country=${country}`;
    console.log("param" + param);
    const options = { params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/detailed_report';
    return this.http.get<Shipment[]>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  /************************************************************************************************** 
   * 
   * For Customer  
   * 
   **************************************************************************************************/
  getSingleShipmentForCustomer(awb:string, altRefNo: string, accountCode: string): Observable<Shipment> {
    let param = `accountCode=${accountCode}&shipmentNo=${awb}&altRefNo=${altRefNo}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/shipment';
    return this.http.get<Shipment>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentListForCustomer(fromDate:string, toDate: string, accountCode: string): Observable<Shipment[]> {
    let param = `fromDate=${fromDate}&toDate=${toDate}&accountCode=${accountCode}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/shipmentlist';
    return this.http.get<Shipment[]>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));

  }

  getShipmentInfoByAltRefNoForCustomer(altRefNo: string, accountCode: string): Observable<Shipment> {

    let param = `altRefNo=${altRefNo}&accountCode=${accountCode}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/altrefno';
    return this.http.get<Shipment>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentInfoByShipmentNoForCustomer(awbNo: string, accountCode:string): Observable<Shipment> {

    let param = `shipmentNo=${awbNo}&accountCode=${accountCode}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/awbno';
    return this.http.get<Shipment>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentInfoByAwbListForCustomer(awb:Array<string>, accCode: string): Observable<Shipment[]> {

    let param = `shipmentNo=${awb}&accountCode=${accCode}`;
    console.log("param" + param);
    const options = { params: new HttpParams({fromString: param})};
    let uri: string = this.apiURL + '/api/awbnolist';
    return this.http.get<Shipment[]>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

  getShipmentInfoByAltRefListForCustomer(awb:Array<string>, accCode: string): Observable<Shipment[]> {
    let param = `shipmentNo=${awb}&accountCode=${accCode}`;

    const options = { params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/altrefnolist';
    return this.http.get<Shipment[]>(uri, options)
      .pipe(
        retry(0),
        catchError(this.handleError));
  }

}
