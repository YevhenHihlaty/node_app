import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegisterPageComponent} from './components/register-page/register-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {OverviewPageComponent} from './components/overview-page/overview-page.component';
import {CategoriesPageComponent} from "./components/categories-page/categories-page.component";
import {CategoriesFormComponent} from "./components/categories-page/categories-form/categories-form.component";
import {PositionsFormComponent} from "./components/categories-page/categories-form/positions-form/positions-form.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {AnalyticsPageComponent} from "./components/analytics-page/analytics-page.component";
import {HistoryPageComponent} from "./components/history-page/history-page.component";
import {OrdersPageComponent} from "./components/orders-page/orders-page.component";
import {OrdersCategoriesComponent} from './components/orders-page/orders-categories/orders-categories.component';
import {OrdersPositionsComponent} from './components/orders-page/orders-positions/orders-positions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    CategoriesPageComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    LoaderComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrdersPageComponent,
    OrdersCategoriesComponent,
    OrdersPositionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
