import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vo } from 'src/app/entity/vo';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

  serverUrl = "https://kuangmainservice.azurewebsites.net/";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
        }),
        method: 'post'
    };

    constructor(private http: HttpClient) { }

    callApiService(serviceName: string, data: {}): Observable<any> {
        return this.http.post(this.serverUrl + serviceName, data, this.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
    }

}
