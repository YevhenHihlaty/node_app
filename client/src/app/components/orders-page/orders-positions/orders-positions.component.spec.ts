import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPositionsComponent } from './orders-positions.component';

describe('OrdersPositionsComponent', () => {
  let component: OrdersPositionsComponent;
  let fixture: ComponentFixture<OrdersPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
