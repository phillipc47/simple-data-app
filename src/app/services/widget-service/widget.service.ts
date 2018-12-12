import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  //TODO: run through api service endpoint
  private _baseUrl: string = "http://somebackend.com/api/";
  private _widgetEndpoint: string = "widget";
  constructor(private http: Http) {}

  getWidgets() {
    return this.http
      .get(this._baseUrl + this._widgetEndpoint)
      .pipe(map(res => res.json()));
  } 

  createWidget(widget) {
    return this.http
      .post(this._baseUrl + this._widgetEndpoint, widget)
      .pipe(map(res => res.json()));
  } 

  updateWidget(update) {
    return this.http
      .put(this._baseUrl + this._widgetEndpoint, update)
      .pipe(map(res => res.json()));
  } 

  deleteWidget(widgetId) {
    return this.http
      .delete(`${this._baseUrl + this._widgetEndpoint}/${widgetId}`)
      .pipe(map(res => res.json()));
  } 
}
