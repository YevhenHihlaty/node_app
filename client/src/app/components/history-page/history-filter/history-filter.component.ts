import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Filter, MaterialDatepicker} from "../../../shared/interfaces";
import {MaterialService} from "../../../shared/classes/material.service";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  start: MaterialDatepicker;
  end: MaterialDatepicker;

  isValide: boolean = true;

  order: number;
  constructor() { }


  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this));
  }
  validate (){

    if (!this.start.date || !this.end.date){
      this.isValide = true;
      return;
    }

    this.isValide = this.start.date < this.end.date;
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.order){
      filter.order = this.order;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date){
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);

  }
}
