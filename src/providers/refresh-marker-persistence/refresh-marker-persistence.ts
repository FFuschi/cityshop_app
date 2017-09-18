import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage} from '@ionic/storage';

//Constants
import {STORAGE_KEYS} from '../../constants';

/*
  Generated class for the RefreshMarkerPersistenceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RefreshMarkerPersistenceProvider {

  constructor(public http: Http, private _storage: Storage) {
    console.log('Hello RefreshMarkerPersistenceProvider Provider');
  }
  
  save(refresh: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.set(STORAGE_KEYS.REFRESH, refresh)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }
    
    get(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._storage.get(STORAGE_KEYS.REFRESH)
                .then((refresh) => {
                    resolve (refresh);
                })
                .catch(()=>{
                    reject();
                })
        });
    }
    
    remove(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.remove(STORAGE_KEYS.REFRESH)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                })
        });
    }

}
