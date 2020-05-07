import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PositionsService} from "../../../shared/services/positions.service";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Position} from "../../../shared/interfaces";
import {OrderService} from "../../../shared/services/order.service";
import {MaterialService} from "../../../shared/classes/material.service";

@Component({
  selector: 'app-orders-positions',
  templateUrl: './orders-positions.component.html',
  styleUrls: ['./orders-positions.component.css']
})
export class OrdersPositionsComponent implements OnInit {

  positions$: Observable<Position[]>
  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private ordersService: OrderService) { }

  ngOnInit(): void {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id']);
          }
        ),
        map(
          (positions: Position[])=>{
            return positions.map(position => {
              position.quantity = 1;
              return position;
            });
          }
        )
      );
  }
  addToOrder(position: Position){
    MaterialService.toast(`Added x${position.quantity}`)
    this.ordersService.add(position);
  }


}
