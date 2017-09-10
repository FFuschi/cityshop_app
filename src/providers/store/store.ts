import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Store} from '../../models/store.model';
import {Product} from '../../models/product.model';

//Constants
import {URL_BASE, URL_ORIGINAL, URL} from '../../constants';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class StoreProvider {

    stores: Array<Store> = [];
    store: Store;

  constructor(
      public _http: Http
      ) {
    console.log('Hello StoreProvider Provider');
  }
  
  getAllStore(token: String, latitude: Number, longitude: Number): Promise<Array<Store>> {
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.STORES.ALLSTORE + token + "/@" + latitude + "," + longitude + "/", {})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) { 
                        for(var i = 0; i < json.data.length; i++){
                            this.stores[i] = new Store(json.data[i])
                        }
                        
                        resolve(this.stores);
                    } else {
                        reject();
                    }
                })
                .catch((err: Response) => {
                    reject(`Errore status: ${err.status}`)
                });
        });
    }
    
    getStore(id: Number): Promise<Store> {
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.STORES.STORE, {"id": id})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) { 
                        this.store = new Store( json.data );
                        
                        resolve(this.store);
                    } else {
                        reject();
                    }
                })
                .catch((err: Response) => {
                    reject(`Errore status: ${err.status}`)
                });
        });
    }
    
    getAllProducts(id: Number): Promise<Array<Product>> {
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.STORES.ALLPRODUCT, {"id": id})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) {
                        resolve(json.data);
                    } else {
                        reject();
                    }
                })
                .catch((err: Response) => {
                    reject(`Errore status: ${err.status}`)
                });
        });
    }
    
    getProduct(id: Number): Promise<Product> {
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.STORES.PRODUCT, {"id": id})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) {
                        let product = new Product(json.data);
                        resolve(product);
                    } else {
                        reject();
                    }
                })
                .catch((err: Response) => {
                    reject(`Errore status: ${err.status}`)
                });
        });
    }

}
