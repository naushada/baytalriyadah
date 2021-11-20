import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Shipment, Account } from 'src/commonDS/DS';
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

  apiURL = 'http://localhost:8080';
  //apiURL = 'https://logistics-sw.herokuapp.com'

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

  updateShipment() {

  }

  getSingleShipment(awb:string, accountCode: string): Observable<Shipment> {
    let param = `accountCode=${accountCode}&shipmentNo=${awb}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/shipment';
    return this.http.get<Shipment>(uri, options)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

  getShipmentList() {

  }

  createAccount(newAccount:Account) : Observable<Account> {
    console.log(JSON.stringify(newAccount));

    return this.http.post<Account>(this.apiURL + '/api/account', JSON.stringify(newAccount), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }


  updateAccount() {

  }
}
