import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, IonicPage } from 'ionic-angular';
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
import {Store} from '../../models/store.model';

//Providers
import {AccountProvider} from '../../providers/account/account';

//Providers
import {StoreProvider} from '../../providers/store/store';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    user: User;
    map: GoogleMap;
    bearing = 0;
    zoom = 15;
    location: LatLng;
    start: LatLng = new LatLng(0, 0);
    foto: String = "http://dominiotestprova.altervista.org/image/avatars/avatardefault.png";
    
    @ViewChild('map_canvas') mapElement: ElementRef;
    
    constructor(
        public navCtrl: NavController, 
        public plt: Platform,
        private googleMaps: GoogleMaps, 
        private geolocation: Geolocation, 
        private statusBar: StatusBar, 
        public popoverCtrl: PopoverController,  
        public modalCtrl: ModalController,
        public sAccount: AccountProvider, 
        public sStore: StoreProvider
        ) {
        
    }
    
    ngOnInit(){
        this.getUser();
        this.foto = "http://dominiotestprova.altervista.org/image/avatars/" + this.user.image;
    }
    
    ionViewWillEnter(){
        this.plt.ready().then(() => {
            
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#7b7b7b');
            
            this.getUser();
            
        });
    }
    
    ionViewDidEnter(){
        
        this.plt.ready().then(() => {
            
            this.loadMap();
           
        });
        
    }
    
    getUser() {
        this.user = this.sAccount.getUser();
            
    }
    
    getStores(latitude: number, longitude: number){
        if (this.user != null){
            
            var token: String = this.user.token;
            this.sStore.getAllStore(token, latitude , longitude)
                .then((data: Array<Store>)=>{
                    for(let n of data){
                        
                        let markerOptions: MarkerOptions = {
                            position: new LatLng(n.latitudine, n.longitudine),
                            disableAutoPan: true,
                            animation: "bounce",
                            icon: {
                                    url: 'www/assets/images/marker.png',
                                    size: {
                                        width: 40,
                                        height: 40
                                     }
                                }
                        };
                        
                        this.map.addMarker(markerOptions)
                            .then((marker: Marker) => {

                                marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                                    this.shop_info(n.id);
                                });
                        });
                    }
                        
                })
                .catch(() => {
                    console.log("errore Mappa: non sono riuscito a Caricare i Marker");
                });     
         
        }
        
    }

    loadMap() {
     // make sure to create following structure in your view.html file
     // and add a height (for example 100%) to it, else the map won't be visible
     // <ion-content>
     //  <div #map id="map" style="height:100%;"></div>
     // </ion-content>

     // create a new map by passing HTMLElement
     
     //let element: HTMLElement = document.getElementById('map_canvas');
     this.map = this.googleMaps.create(this.mapElement.nativeElement);
     //
     // listen to MAP_READY event
     // You must wait for this event to fire before adding something to the map or modifying it in anyway
     this.map.one(GoogleMapsEvent.MAP_READY).then(
       () => {
         // Now you can add elements to the map like the marker// create LatLng object
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
                        'minZoom': 13,
                        'maxZoom': 18
                    }
                }
           });
            
            this.getPosition();
            
            this.whatchPosition();
           
       });
     
    }
    
    getPosition(){
        this.geolocation.getCurrentPosition().then((data)=>{
            
            this.location = new LatLng(data.coords.latitude, data.coords.longitude);
            
            this.map.addEventListener(GoogleMapsEvent.CAMERA_CHANGE).subscribe(() => {
                this.map.getCameraPosition().then((resp) => {
                    let controlZoom = resp.zoom;
                    let controlBearing = resp.bearing;
                    
                    if(controlZoom != this.zoom || controlBearing != this.bearing){
                        this.zoom = controlZoom;
                        this.bearing = controlBearing;
                        
                        this.map.animateCamera({
                            target: this.location,
                            zoom: this.zoom,
                            tilt: 0,
                            bearing: this.bearing,
                            duration: 500
                        });
                    }
                });
            });
        });
    }
    
    whatchPosition(){
        let watch = this.geolocation.watchPosition();
           watch.subscribe((data) => {
             // data can be a set of coordinates, or an error (if an error occurred).
             // data.coords.latitude
             // data.coords.longitude
                
                this.location = new LatLng(data.coords.latitude, data.coords.longitude);
                
                this.map.animateCamera({
                    target: this.location,
                    zoom: this.zoom,
                    tilt: 0,
                    bearing: this.bearing,
                    duration: 500
                });
                
                if (this.start.lat - data.coords.latitude > 0.02 || this.start.lat - data.coords.latitude < -0.02 ){
                    
                    this.start = this.location;
                    
                    this.map.clear();
                    this.getStores(data.coords.latitude, data.coords.longitude);
                    
                }
           
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
        let infoModal = this.modalCtrl.create(ShopModalPage, {map: this.map, shop_id: shop_id});
        infoModal.present();

        infoModal.onWillDismiss(()=>{
            this.map.setClickable(true)
        });
    }

}
