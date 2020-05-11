import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../interfaces";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

// @ts-ignore
@Injectable({
    providedIn: 'root'
  }
)
export class OrdersService {

  constructor(private httpClient: HttpClient) {
  }

  create(order: Order): Observable<Order> {
    return this.httpClient.post<Order>('/api/order', order)
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this.httpClient.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }
}
