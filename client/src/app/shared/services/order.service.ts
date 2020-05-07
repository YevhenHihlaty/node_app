import {Injectable} from '@angular/core'
import {Order, OrderPosition, Position} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class OrdersService {

  public list: OrderPosition[] = [];
  public totalPrice: number = 0;

  constructor(private httpClient: HttpClient) {
  }

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })
    const candidate = this.list.find(pos => pos._id === position._id);
    if (candidate) {
      candidate.quantity += position.quantity;
    } else {
      this.list.push(orderPosition);
    }
    this.computePrice();
  }

  remove(positionOrder: OrderPosition) {
    const index = this.list.findIndex(pos => pos._id === positionOrder._id);
    this.list.splice(index, 1);
    this.computePrice();
  }

  computePrice() {
    this.totalPrice = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);

  }

  create(order: Order): Observable<Order>{

    return this.httpClient.post<Order>('/api/order', order);
  }
  clear() {
  }
}
