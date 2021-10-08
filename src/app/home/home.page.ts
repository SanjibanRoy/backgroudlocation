import { Component } from '@angular/core';
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
  config: BackgroundGeolocationConfig = {
    //desiredAccuracy: 20,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: false, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, 
    startForeground: true,
    notificationTitle: 'Location set by GPS',   // <-- android only, customize the title of the notification
    notificationText: 'ENABLED',   
    notificationsEnabled: false, // enable this to clear background location settings when the app terminates
    interval: 10000,
    fastestInterval: 5000,
    activitiesInterval: 10000,
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
          // this.BackgroundGeolocation.startTask(function(taskKey) {
          //   // execute long running task
          //   // eg. ajax post location
          //   // IMPORTANT: task has to be ended by endTask
          //   BackgroundGeolocation.endTask(taskKey);
          // });
          
          this.backgroundGeolocation.startTask().then((taskKey) => {
            // execute long running task
            // eg. ajax post location
            // IMPORTANT: task has to be ended by endTask
            //this.backgroundGeolocation.endTask(taskKey);
            setInterval(() => this.updatelocation(location.latitude,location.longitude,taskKey), 10000);
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
          });
          

          //this.updatelocation(location.latitude,location.longitude)
        
          });
      });

      

    }
    start(){
      alert("Start");
      this.backgroundGeolocation.start();
    }
    stop(){
      alert("Stop");
      this.backgroundGeolocation.stop();
    }
    updatelocation(lat,lon,taskid){
      const formData = new FormData();
      formData.append('lat', lat);
      formData.append('lon',  lon);
      formData.append('name',  'Sanjiban');
      
      this.http.post("https://mobileapp.nesdr.gov.in/ASDMA/locationtest.php", formData)
          .pipe(
              finalize(() => {
                 
              })
          )
          .subscribe(res => { 
            //this.backgroundGeolocation.endTask(taskid);
            
        });
    }

}
