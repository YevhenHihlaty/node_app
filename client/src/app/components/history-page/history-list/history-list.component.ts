import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  selectedOrder: Order;
  constructor() {
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }


  computePrice(order: Order): number {
    const totalPrice = order.list.reduce((total, listItem)=>{
        return total += listItem.quantity * listItem.cost;
      },0)
    return totalPrice;
  }

  selectOrder(order: Order)  {
    this.selectedOrder = order;
    this.modal.open();
  }


  closeModal() {
    this.modal.close();
  }
}
