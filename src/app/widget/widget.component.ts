import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../services/widget-service/widget.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  widgets: any[] = [];
  myWidget: string;
  widgetEdit: string;
  editMode: boolean = false;
  loading: boolean = false;

  constructor(private _widgetService: WidgetService) {}

  ngOnInit() {
    this.getAllwidgets();
  }

  getAllwidgets() {
    this._widgetService.getWidgets().subscribe(data => {
      this.widgets = data;
    });
  } 

  create() {
    this.loading = true;
    const postData = {
      description: this.myWidget
    };

    this._widgetService.createWidget(postData).subscribe(data => {
      this.loading = false;
      this.getAllwidgets();
      this.myWidget = "";
    });
  } 

  edit(widget) {
    this.widgetEdit = Object.assign({}, widget);
    widget.editing = true;
    this.editMode = true;
  } 

  saveEdit(widget) {
    this._widgetService.updateWidget(this.widgetEdit).subscribe(data => {
      //widget = data;
      this.getAllwidgets();
      widget.editing = false;
      this.editMode = false;
    });
  } 

  delete(widget) {
    console.log("Delete");
    this._widgetService.deleteWidget(widget.id).subscribe(data => {
      this.getAllwidgets();
    });
  } 
}
