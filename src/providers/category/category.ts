import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Categoria} from '../../models/categoria.model';

//Constants
import {URL_BASE, URL_ORIGINAL, URL} from '../../constants';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  constructor(public _http: Http) {
  }

    getCategories(): Promise<Array<Categoria>>{
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(URL_BASE /*URL_ORIGINAL*/ + URL.CATEGORIES.ALL, {})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) { 
                        let result: Array<Categoria> = json.data;
                        
                        resolve(result);
                    } else {
                        reject();
                    }
                })
                .catch((err: Response) => {
                    reject(`Errore status: ${err.status}`)
                });
        });
    }

    addUserCategories(token: String, category: Categoria): Promise<Categoria>{
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(URL_BASE /*URL_ORIGINAL*/ + URL.CATEGORIES.ADD + token, {"nome": category.nome})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) { 
                        let result = new Categoria(json.data);
                        
                        resolve(result);
                    } else {
                        reject();
                    }
                })
                .catch((err: Response) => {
                    reject(`Errore status: ${err.status}`)
                });
        });
    }
    
    removeUserCategories(token: String, category: Categoria): Promise<Categoria>{
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(URL_BASE /*URL_ORIGINAL*/ + URL.CATEGORIES.REMOVE + token, {"nome": category.nome})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) { 
                        let result = new Categoria(json.data);
                        
                        resolve(result);
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
