import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage} from '@ionic/storage';

//Interface
import {UserPersistanceInterface} from '../../interfaces/userpersistance.interface';

//Models
import {User} from '../../models/user.model';

//Constants
import {STORAGE_KEYS} from '../../constants';

/*
  Generated class for the UserPersistanceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserPersistanceProvider implements UserPersistanceInterface {

  constructor(
      public http: Http, 
      private _storage: Storage
      ) {
    console.log('Hello UserPersistanceProvider Provider');
  }
  
  save(user: User): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.set(STORAGE_KEYS.USER, user)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }
    
    get(): Promise<User> {
        return new Promise((resolve, reject) => {
            this._storage.get(STORAGE_KEYS.USER)
                .then((user) => {
                    if (user !== null) {
                        resolve(new User(user));
                    } else {
                        reject();
                    }
                })
        });
    }
    
    remove(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.remove(STORAGE_KEYS.USER)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                })
        });
    }

}
