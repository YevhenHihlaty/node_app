import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../shared/interfaces";
import {CategoriesService} from "../../../shared/services/categories.service";

@Component({
  selector: 'app-orders-categories',
  templateUrl: './orders-categories.component.html',
  styleUrls: ['./orders-categories.component.css']
})
export class OrdersCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
  }

}
