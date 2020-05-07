import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CategoriesService} from "../../shared/services/categories.service";
import {Observable} from "rxjs";
import {Category} from "../../shared/interfaces";
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";
import {OrdersService} from "../../shared/services/orders.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit, AfterViewInit,OnDestroy {

  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  categories$: Observable<Category[]>;
  isRoot: boolean;
  constructor(private router: Router,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe( event =>{

      if(event instanceof NavigationEnd){
        this.isRoot = this.router.url === '/order';
      }

    })
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }


  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.modal.close();
  }
}
