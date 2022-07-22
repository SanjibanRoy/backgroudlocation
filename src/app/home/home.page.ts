import { Component,OnInit } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { finalize,map  } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // config: BackgroundGeolocationConfig = {
  //   //desiredAccuracy: 20,
  //   stationaryRadius: 20,
  //   distanceFilter: 30,
  //   debug: false, //  enable this hear sounds for background-geolocation life-cycle.
  //   stopOnTerminate: false, 
  //   startForeground: true,
  //   notificationTitle: 'Location set by GPS',   // <-- android only, customize the title of the notification
  //   notificationText: 'ENABLED',   
  //   notificationsEnabled: false, // enable this to clear background location settings when the app terminates
  //   interval: 10000,
  //   fastestInterval: 5000,
  //   activitiesInterval: 10000,
    
  // };
  requestOptions:any
  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 1000,
    stationaryRadius: 1, //I reduce this from 20 to 2
    distanceFilter: 3, //I reduce this from 30 to 3
    interval: 1000, //This is missing from example
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    fastestInterval: 1000,
    activitiesInterval: 2000,
    url: 'https://nodeserver.nesdr.gov.in/locations',
    syncUrl: 'https://nodeserver.nesdr.gov.in/sync',
    syncThreshold: 100,
    httpHeaders: {
      'X-FOO': 'bar'
    },
    // customize post properties
    postTemplate: {
      lat: '@latitude',
      lon: '@longitude',
      foo: 'Nilay' // you can also add your own properties
    }
    
  };

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation,
    private http:HttpClient
    ) {
      
      this.backgroundGeolocation.configure(this.config).then(() => {
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
        console.log('Locations', location);
        console.log('Speed', location.speed); // Tracks the speed of user

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          // this.backgroundGeolocation.finish(); // FOR IOS ONLY
          var lat =location.latitude;
          var lon =location.longitude

          // var myHeaders = new Headers();
          // myHeaders.append("X-FOO", "bar");
          // myHeaders.append("Content-Type", "application/json");

          // var raw = JSON.stringify({
          //   "latitude": 25.6768,
          //   "longitude": 91.927,
          //   "foo": "bar"
          // });

          // this.requestOptions = {
          //   method: 'POST',
          //   headers: myHeaders,
          //   body: raw,
          //   redirect: 'follow'
          // };

          // fetch("http://192.168.0.100:3000/locations", this.requestOptions)
          //   .then(response => response.text())
          //   .then(result => console.log(result))
          //   .catch(error => console.log('error', error));
          
          //  const formData = new FormData();
          //   formData.append('lat', String(lat));
          //   formData.append('lon',  String(lon));
          //   formData.append('name',  'Sanjiban');

          //   fetch('https://mobileapp.nesdr.gov.in/ASDMA/locationtest/locationtest1.php?lat='+String(lat)+'&lon='+String(lon)+'&name=sanjiban').then(res => res.json())
          //       .then(json => {
                  
          //         console.log(json)  
            
          //   });
                        
            // this.http.post("https://mobileapp.nesdr.gov.in/ASDMA/locationtest.php", formData)
            //     .pipe(
            //         finalize(() => {
                       
            //         })
            //     )
            //     .subscribe(res => { 
            //       console.log(res);
            //   });


          // this.BackgroundGeolocation.startTask(function(taskKey) {
          //   // execute long running task
          //   // eg. ajax post location
          //   // IMPORTANT: task has to be ended by endTask
          //   BackgroundGeolocation.endTask(taskKey);
          // });

          //********************************************************************************** */
          // this.backgroundGeolocation.startTask().then((taskKey) => {
          //   var lat =location.latitude;
          //   var lon =location.longitude
            // const formData = new FormData();
            // formData.append('lat', String(lat));
            // formData.append('lon',  String(lon));
            // formData.append('name',  'Sanjiban');
            
            // this.http.post("https://mobileapp.nesdr.gov.in/ASDMA/locationtest.php", formData)
            //     .pipe(
            //         finalize(() => {
                       
            //         })
            //     )
            //     .subscribe(res => { 
                  
            //   });
          //      fetch('https://mobileapp.nesdr.gov.in/ASDMA/locationtest/locationtest1.php?lat='+String(lat)+'&lon='+String(lon)+'&name=sanjiban').then(res => res.json())
          //       .then(json => {
                  
          //         console.log(json)  
            
          //   });
          // });
          //********************************************************************************** */

            //setInterval(() => this.updatelocation(location.latitude,location.longitude,taskKey), 10000);
            // var lat =location.latitude;
            // var lon =location.longitude
            // const formData = new FormData();
            // formData.append('lat', String(lat));
            // formData.append('lon',  String(lon));
            // formData.append('name',  'Sanjiban');
            
            // this.http.post("https://mobileapp.nesdr.gov.in/ASDMA/locationtest.php", formData)
            //     .pipe(
            //         finalize(() => {
                       
            //         })
            //     )
            //     .subscribe(res => { 
                  
            //   });

            

         // });
          

          //this.updatelocation(location.latitude,location.longitude)
        
          });
      });

      

    }
    OnInit(){
      this.backgroundGeolocation.start();
    } 
    start(){
      alert("Start");
      this.backgroundGeolocation.start();
    }
    stop(){
      alert("Stop");
      this.backgroundGeolocation.stop();
    }
    
}
