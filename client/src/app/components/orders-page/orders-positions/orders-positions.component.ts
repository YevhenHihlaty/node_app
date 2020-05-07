import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PositionsService} from "../../../shared/services/positions.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-orders-positions',
  templateUrl: './orders-positions.component.html',
  styleUrls: ['./orders-positions.component.css']
})
export class OrdersPositionsComponent implements OnInit {

  positions$: Observable<Position[]>
  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
      switchMap()
      )
  }

}
