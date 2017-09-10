import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Product} from '../../models/product.model';

//Constants
import {URL_BASE, URL_ORIGINAL, URL} from '../../constants';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductProvider {

  constructor(public _http: Http) {
    console.log('Hello ProductProvider Provider');
  }
  
  getAllProducts(id: Number): Promise<Array<Product>> {
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.PRODUCTS.ALLPRODUCT, {"id": id})
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
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.PRODUCTS.PRODUCT, {"id": id})
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
