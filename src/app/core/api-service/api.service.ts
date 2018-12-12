import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// This class is trying to do too much, I would rather do the logging through a general
// Http Interceptor wired up through the application and then these methods just become
// wrappers.  For a first start, this will get us going for the example and that's the only intent

export class ApiService {
	unknownApiErrorMessage = 'An error was returned from the API in an unexpected format';

	constructor(private _http: HttpClient) { }

	/**
	 * Executes an HTTP GET to the given URL, and deserializes the response to type T
	 * @param url API URL to be invoked
	 */
	doGet<T>(url: string): Observable<T> {
    let observable: Observable<T> = this._http.get<T>(url).pipe(catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
    observable.subscribe(response => {
      const parsedResponse = this.parsehttpResponse(response);
      this.logResponse(url, JSON.stringify(parsedResponse));
      return parsedResponse;
    });

    return observable;
	}

		/**
	 * Executes an HTTP PUT to the given URL with a body type T. The response is serialized to type U
		which could be the same as type T
	 * @param url URL of the API endpoint being invoked
	 * @param data JSON data to be passed as payload
	 */
	doPut<T, U>(url: string, data: T): Observable<U> {
    let observable: Observable<U> = this._http.put<U>(url, data).pipe(catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
    observable.subscribe(response => {
      const parsedResponse = this.parsehttpResponse(response);
      this.logResponse(url, JSON.stringify(parsedResponse));
      return parsedResponse;
    });

    return observable;
	}

	/**
	 * Method that calls the HTTP POST
	 * @param url URL of the API endpoint being called
	 * @param data data to be posted as payload in JSON format
	 */
	doPost<T>(url: string, data: T): Observable<any> {
    let observable: Observable<any> = this._http.post(url, data).pipe(catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
    observable.subscribe(response => {
      const parsedResponse = this.parsehttpResponse(response);
      this.logResponse(url, JSON.stringify(parsedResponse));
      return parsedResponse;
    });

    return observable;
	}

	/**
	 * This method contains the error handling routine
	 * @param err HttpErrorResponse passed as input
	 */
	private handleError(error: HttpErrorResponse | any) {
		const errorMsg = error.message || this.unknownApiErrorMessage;
		console.log('ErrorResponse.Message:' + error.message);
		console.log('ErrorResponse.status:' + error.status);
		return Observable.throw(errorMsg);
	}

	/**
	 * This method parses the Gateway response -- wherein API Gateway exists and is used for call through
	 * @param response HTTPResponse object from Gateway
	 */
	private parsehttpResponse<T>(response): T | Blob {
		// tslint:disable-next-line:prefer-const
		let target: T;
		if (target instanceof Blob) {
			return response.blob();
		} else {
			return response.length > 0 ? <T>response[1] : <T>response;
		}
	}

	/**
	 * This method logs the http response
	 * @param url
	 * @param parsedResponse
	 */
	private logResponse(url: string, parsedResponse: string) {
		const log =
			`Initiate to make service call:
				Input: url:${url}
        Output: ${JSON.stringify(parsedResponse)}`;
    console.log(log);
  }
}
