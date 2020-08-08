import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './modules/map/map.component';
import { Covid19Service } from './modules/map/service/covid19.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w',
      // tslint:disable-next-line: max-line-length
      geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
    FormsModule
  ],
  providers: [Covid19Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
