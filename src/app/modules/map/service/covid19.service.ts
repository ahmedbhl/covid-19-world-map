import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Helper } from 'src/app/core/services/helper.service';
import { HttpHeader } from 'src/app/shared/utils/http-header';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  /** Url for request */
  private readonly _hostUrl: string;

  /**
   * Request Headers
   */
  private readonly _headers: HttpHeaders;

  /**
   * constructor
   * @param _http
   * @param _helper
   */
  constructor(
    private readonly _http: HttpClient,
    private readonly _helper: Helper) {
    this._hostUrl = environment.covid_api_url;
    this._headers = HttpHeader.getHeaders();
  }

  /**
   * Get A summary of new and total cases per country updated daily.
   */
  public getSummary<Summary>(): Observable<Summary> {
    const options = { headers: this._headers };
    return this._http.get<Summary>(`${this._hostUrl}/summary`, options).pipe(
      tap(() => this._helper.trace(`[Serivce call ] - Get the summary data : ${this._hostUrl}`)),
      catchError(this._helper.handleErrors('[catchError] - Get the summary data', null)));
  }

  /**
   * Get the Data By Country.
   * @param country
   */
  public getDataByCountry(country: string): Observable<any> {
    const options = { headers: this._headers };
    return this._http.get<any>(`${this._hostUrl}/live/country/${country}`, options).pipe(
      tap(() => this._helper.trace(`[Serivce call ] - Get the Data By Country : ${this._hostUrl}`)),
      map(item => item[0]),
      catchError(this._helper.handleErrors('[catchError] - Get the Data By Country', null)));
  }


  /**
   * Get and return the ip
   */
  getIpAddress() {
    const options = { headers: this._headers };
    return this._http.get<{ ip: string }>('http://api.ipify.org/?format=json', options).pipe(
      tap(() => this._helper.trace(`[Serivce call ] - Get the ip adress`)),
      catchError(this._helper.handleErrors('[catchError] - Get the ip adress', null)));
  }

  /**
   * Get the Country information by the ip
   * @param ip
   */
  getGEOLocation(ip) {
    debugger
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=b81cc74e124247a0b99438bc3c22f79c&ip=${ip}&fields=geo`;
    const options = { headers: this._headers };
    return this._http.get(url, options).pipe(
      tap(() => this._helper.trace(`[Serivce call ] - get the geo location`)),
      catchError(this._helper.handleErrors('[catchError] - get the geo location', null))
    );
  }
}
