import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Map, MapboxGeoJSONFeature, MapLayerMouseEvent } from 'mapbox-gl';
import { delay } from 'rxjs/operators';
import { Helper } from 'src/app/core/services/helper.service';
import { Country } from './models/country';
import { Summary } from './models/summary';
import { Covid19Service } from './service/covid19.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class MapComponent implements OnInit {

  @Input()
  darkMode: boolean;
  map: Map;
  summary: Summary;
  countries: Country[];
  countrisPosition: any[] = [];
  points: GeoJSON.FeatureCollection<GeoJSON.Point>;
  selectedPoint: MapboxGeoJSONFeature | null;
  cursorStyle: string;
  slectedCountry: string;


  constructor(
    private readonly _covidService: Covid19Service,
    private readonly _helper: Helper) { }

  async ngOnInit() {
    this.getVisitorCountry();
    this._initPoint();
    await this.getSummary().then(() => {
      this.countries.map(async (country, index) => {
        country.Lat = 0;
        country.Lon = 0;
        this.getDataByCountry(country);
      });
    });
  }

  /**
   * change the language of the map
   */
  public changeLangTo(language: string) {
    this.map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + language + '}');
  }

  /**
   * Get A summary of new and total cases per country updated daily.
   */
  async getSummary() {
    // tslint:disable-next-line: no-unused-expression
    await this._covidService.getSummary().toPromise().then(
      (summary: Summary) => {
        this.countries = [];
        if (summary && summary.Countries) {
          this.summary = summary;
          this.countries = summary.Countries;
          this._helper.trace(`[Component call ] - Get the summary data : [Countries : ${this.summary.Countries.length}]`);
        }
      },
      (error) => this._helper.handleErrors(error)); // .unsubscribe;
  }

  /**
  * Get the Data By Country.
  * @param country
  */
  public getDataByCountry(country: Country) {
    this._covidService.getDataByCountry(country.Country).subscribe(
      (data) => {
        if (data && data.Lat && data.Lon) {
          country.Lat = data.Lat;
          country.Lon = data.Lon;
          this.countrisPosition.push(country);
          this.points.features.push({
            type: 'Feature',
            properties: {
              description: '',
              country: country.Country,
              total: country.TotalConfirmed,
              TotalConfirmed: country.TotalConfirmed - (country.TotalRecovered + country.TotalDeaths),
              TotalRecovered: country.TotalRecovered,
              TotalDeaths: country.TotalDeaths,
              icon: 'circle',
            },
            geometry: {
              type: 'Point',
              coordinates: [country.Lon, country.Lat],
            },
          });
        }
        this._helper.trace(`[Component call ] - Get the summary data : [Countries : ${data}]`);
      },
      (error) => this._helper.handleErrors(error)); // .unsubscribe;
  }

  /**
   * Open the popup when user clic on the circle on the amp
   * @param evt
   */
  public onClick(evt: MapLayerMouseEvent) {
    // tslint:disable-next-line: no-non-null-assertion
    this.selectedPoint = evt.features![0];
    this.slectedCountry = this.selectedPoint.properties.country;
  }

  /**
   * Init the point map
   */
  private _initPoint() {
    this.points = {
      type: 'FeatureCollection',
      features: [],
    };
  }

  /**
   * Get the visitor cuntry
   */
  public getVisitorCountry() {
    this._covidService.getIpAddress().subscribe(result => {
      const ip = result ? result['ip'] : null;
      this._covidService.getGEOLocation(ip).subscribe(res => {
        this.slectedCountry = res ? res['country_name'] : 'France';
      }, (error) => {
        this._helper.handleErrors('[catchError] - get the geo location', error);
      });
    });
  }

}
