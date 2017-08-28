import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { PopoverController } from 'ionic-angular';

import { ShopModalPage } from '../shop-modal/shop-modal';
import { PopoverPage } from '../popover/popover';
import { ProfilePage } from '../profile/profile';


//Models
import {User} from '../../models/user.model';

//Providers
import {AccountProvider} from '../../providers/account/account';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    firstname: String = "";
    image: String = "";
    map: GoogleMap;
    
    constructor(
        public navCtrl: NavController, 
        public plt: Platform, 
        private googleMaps: GoogleMaps, 
        private geolocation: Geolocation, 
        private statusBar: StatusBar, 
        public popoverCtrl: PopoverController,  
        public modalCtrl: ModalController,
        public sAccount: AccountProvider, 
        ) {
        
    }
    
    ionViewDidEnter(){
        
        this.plt.ready().then(() => {
            
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#7b7b7b');
            
            this.getUser();
            this.loadMap();
            
        });
        
    }
    
    getUser() {
        var user = this.sAccount.getUser();
        this.firstname = user.firstname;
        this.image = user.image;
            
    }
    
    

    loadMap() {
     // make sure to create following structure in your view.html file
     // and add a height (for example 100%) to it, else the map won't be visible
     // <ion-content>
     //  <div #map id="map" style="height:100%;"></div>
     // </ion-content>

     // create a new map by passing HTMLElement
     let element: HTMLElement = document.getElementById('map_canvas');

     this.map = this.googleMaps.create(element);

     // listen to MAP_READY event
     // You must wait for this event to fire before adding something to the map or modifying it in anyway
     this.map.one(GoogleMapsEvent.MAP_READY).then(
       () => {
         // Now you can add elements to the map like the marker
           
           // create LatLng object
           let bearing = 0;
           let zoom = 15;
           let location;
           let ionic: LatLng = new LatLng(42.5802706, 13.9850773);
           let fontana: LatLng = new LatLng(42.3538387,13.4013294,);
            
             // create new marker
            let markerOptions: MarkerOptions = {
              position: ionic,
              disableAutoPan: true
            };

            this.map.addMarker(markerOptions)
              .then((marker: Marker) => {
                  marker.setIcon({
                      url: 'www/assets/images/marker.png',
                      size: {
                          width: 40,
                          height: 40
                       }
                  })
                  
                  marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                      var shop_id = 1;
                      this.shop_info(shop_id);
                  });
            });
            
             // create new marker
            let marker1Options: MarkerOptions = {
              position: fontana,
              title: 'Ionic',
              disableAutoPan: true
            };

            this.map.addMarker(marker1Options)
              .then((marker: Marker) => {
                  marker.setIcon({
                      url: 'www/assets/images/marker.png',
                      size: {
                          width: 40,
                          height: 40
                       }
                  })
            });
            
            this.map.setOptions({
                'controls': {
                    'compass': true,
                    'myLocationButton': true,
                     'indoorPicker': true
                },
                'gestures': {
                    'scroll': false,
                    'tilt': false,
                    'rotate': true,
                    'zoom': true
                },
                'preferences': {
                    'zoom': {
                        'minZoom': 15,
                        'maxZoom': 18
                    }
                }
           });
            
            
           let watch = this.geolocation.watchPosition();
           watch.subscribe((data) => {
             // data can be a set of coordinates, or an error (if an error occurred).
             // data.coords.latitude
             // data.coords.longitude
                
                location = new LatLng(data.coords.latitude, data.coords.longitude);

                this.map.animateCamera({
                    target: location,
                    zoom: zoom,
                    tilt: 0,
                    bearing: bearing,
                    duration: 500
                });
           
            });
            
            this.map.addEventListener(GoogleMapsEvent.CAMERA_CHANGE).subscribe(() => {
                this.map.getCameraPosition().then((resp) => {
                    let controlZoom = resp.zoom;
                    let controlBearing = resp.bearing;
                    
                    if(controlZoom != zoom || controlBearing != bearing){
                        zoom = controlZoom;
                        bearing = controlBearing;
                        
                        this.map.animateCamera({
                            target: location,
                            zoom: zoom,
                            tilt: 0,
                            bearing: bearing,
                            duration: 500
                        });
                    }
                });
            });
           
       });
     
    }
    
    presentPopover(myEvent) {
        this.map.setClickable(false);
        let popover = this.popoverCtrl.create(PopoverPage, {map:this.map});

        popover.present({
          ev: myEvent
        });
        
        popover.onWillDismiss(()=>{
            this.map.setClickable(true)
        })
      }
      
    go_profile(){
       this.navCtrl.push(ProfilePage);
    }
    
    shop_info(shop_id){
       this.map.setClickable(false);
        let infoModal = this.modalCtrl.create(ShopModalPage, {map:this.map, shop_id:shop_id});
        infoModal.present();

        infoModal.onWillDismiss(()=>{
            this.map.setClickable(true)
        });
    }

}
