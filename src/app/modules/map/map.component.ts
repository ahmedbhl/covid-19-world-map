import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Map } from 'mapbox-gl';

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

  constructor() { }

  ngOnInit() {
  }
  changeLangTo(language: string) {
    this.map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + language + '}');
  }
}
