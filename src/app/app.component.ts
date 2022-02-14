import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { finalize,map  } from 'rxjs/operators';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 2, //I reduce this from 20 to 2
    distanceFilter: 3, //I reduce this from 30 to 3
    interval: 2000, //This is missing from example
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  };
  constructor(  private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation,
    private http:HttpClient) {}

  OnInit(){
    
  }
}
