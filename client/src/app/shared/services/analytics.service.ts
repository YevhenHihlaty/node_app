import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AnalyticsPage, OverviewPage} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private httpClient: HttpClient) {
  }

  getOverview(): Observable<OverviewPage>{
    return this.httpClient.get<OverviewPage>('/api/analytics/overview');
  }

  getAnalytics(): Observable<AnalyticsPage> {
    return this.httpClient.get<AnalyticsPage>('/api/analytics/analytics');
  }
}
