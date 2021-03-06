import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {User} from '../../models/user.model';
import {UserReg} from '../../models/user.model';
import {Categoria} from '../../models/categoria.model';
import {Brand} from '../../models/brand.model';

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
        this.initialize();
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
        return this._user != null;
    }
    
    login(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.LOGIN, { "email": email, "password": password })
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
                .catch((err: Response) => {
                    reject(`Errore status: ${err.status}`)});
                });
    }
    
    signup(user: UserReg, categories: Array<Categoria>, brands: Array<Brand>): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.SIGNUP, {user: user, categories: categories, brands: brands}).toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) {
                        resolve();
                    } else {
                        reject(json.message);
                    }
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
    }
    
    update(userUp: User, token: String): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.put(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.UPDATE + token, {"nome": userUp.firstname, "cognome": userUp.lastname, "foto": userUp.image}).toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) {
                        this._sUserPersistance.save(userUp);
                        resolve();
                    } else {
                        reject(json.message);
                    }
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
    }
    
    logout(): Promise<any> { 
        return new Promise((resolve, reject) => {
            this._http.get(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.LOGOUT + this._user.token).toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) {
                        this._sUserPersistance.remove();
                        
                        resolve();
                    } else {
                        reject(json.message);
                    }
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
    }
    
    userExsist(email: String): Promise<boolean>{
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.EXIST, {"email": email})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) {                    
                        resolve(json.data);
                    } else {
                        reject(json.message);
                    }
                })
                .catch((err: Response) => {
                    reject(`Errore status: ${err.status}`)
                });
        });
    }
    
    getUserCategories(token: String): Promise<Array<Categoria>>{
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.CATEGORY + token, {})
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
    
    getUserBrands(token: String): Promise<Array<Brand>>{
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.BRAND + token, {})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) { 
                        let result: Array<Brand> = json.data;
                        
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
    
    getAllUserCategories(token: String): Promise<Array<Categoria>>{
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.CATEGORYALL + token, {})
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
    
    getAllUserBrands(token: String): Promise<Array<Brand>>{
        return new Promise((resolve, reject) => {
            //URL_BASE = conessione tramite proxy;
            //URL_ORIGINAL = connessione diretta;
            this._http.post(/*URL_BASE*/ URL_ORIGINAL + URL.USERS.BRANDALL + token, {})
                .toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    if (json.result) { 
                        let result: Array<Brand> = json.data;
                        
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
