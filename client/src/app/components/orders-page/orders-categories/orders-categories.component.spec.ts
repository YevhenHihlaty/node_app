import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCategoriesComponent } from './orders-categories.component';

describe('OrdersCategoriesComponent', () => {
  let component: OrdersCategoriesComponent;
  let fixture: ComponentFixture<OrdersCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
