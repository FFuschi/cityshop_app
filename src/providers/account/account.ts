import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {User} from '../../models/user.model';

//Interfaces
import {UserPersistanceInterface} from '../../interfaces/userpersistance.interface';

//Providers
import {UserPersistanceProvider} from '../user-persistance/user-persistance';

//Constants
import {URL_BASE, URL_ORIGINAL, URL} from '../../constants';

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AccountProvider {
  
    private _user: User = null;
    private _sUserPersistance: UserPersistanceInterface;
    constructor(
        private _http: Http,
        sUserPers: UserPersistanceProvider
    ) {
        console.log('Hello Account Provider');
        
        this._sUserPersistance = sUserPers;
    }
    
    initialize(): Promise<any> {
        return new Promise(resolve => {
            this._sUserPersistance.get()
                .then(user => {
                    this._user = user;
                    resolve();
                })
                .catch(() => resolve());
        });
    }
    
    getUser(): User {
        return this._user;
    }

    isLogged(): boolean {
        return this._user !== null;
    }
    
    login(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.LOGIN, { email, password })
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) { 
                        this._user = new User( json.data );
                        this._sUserPersistance.save(this._user);
                        
                        resolve(this._user);
                    } else {
                        reject();
                    }
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
    }

}
