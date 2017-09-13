import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage} from '@ionic/storage';

//Constants
import {STORAGE_KEYS} from '../../constants';
/*
  Generated class for the AccesspersistanceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AccesspersistanceProvider {

  constructor(public http: Http, private _storage: Storage) {
    console.log('Hello AccesspersistanceProvider Provider');
  }
  
  save(access: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.set(STORAGE_KEYS.ACCESS, access)
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
            this._storage.get(STORAGE_KEYS.ACCESS)
                .then((access) => {
                    if (access == true) {
                        resolve (access);
                    } else {
                        reject();
                    }
                })
        });
    }
    
    remove(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.remove(STORAGE_KEYS.ACCESS)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                })
        });
    }

}
