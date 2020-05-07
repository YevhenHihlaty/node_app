import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {OverviewPageComponent} from "./components/overview-page/overview-page.component";
import {AnalyticsPageComponent} from "./components/analytics-page/analytics-page.component";
import {HistoryPageComponent} from "./components/history-page/history-page.component";
import {CategoriesPageComponent} from "./components/categories-page/categories-page.component";
import {OrdersPageComponent} from "./components/orders-page/orders-page.component";
import {CategoriesFormComponent} from "./components/categories-page/categories-form/categories-form.component";
import {OrdersCategoriesComponent} from "./components/orders-page/orders-categories/orders-categories.component";
import {OrdersPositionsComponent} from "./components/orders-page/orders-positions/orders-positions.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewPageComponent},
      {path: 'analytics', component: AnalyticsPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'order', component: OrdersPageComponent, children:[
          {path: '', component: OrdersCategoriesComponent},
          {path: ':id', component: OrdersPositionsComponent}
        ]},
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'categories/new', component: CategoriesFormComponent},
      {path: 'categories/:id', component: CategoriesFormComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}


