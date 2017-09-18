import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Globalization } from '@ionic-native/globalization';
import {Storage} from '@ionic/storage';

import {STORAGE_KEYS, DICTIONARY_LANGUAGE_DEFAULT} from '../../dictionary/constants';

import {OptionsGetDictionary} from '../../dictionary/types';


/*
  Generated class for the DictionaryServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DictionaryServiceProvider {
    
    public dictionary: any;
    private _preferredLanguage: string;

  constructor(
        private globalization: Globalization,
        private _http: Http,
        private _sStorage: Storage
      ) {
  }

    load() {
        return new Promise((resolve, reject) => {
            
            this._getLanguageStored().then(value => {
                let {language} = value;
                
                this._preferredLanguage = language;
                
                this._getDictionaryFromAssets(language)
                    .then((dict) => {
                        this.dictionary = dict;
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    });
            })
            
        });
    }
    
    
    /**
     * Ritorna il valore corrispondente alla 'key' dal dizionario caricato 
     */
    get(key: string, options?: OptionsGetDictionary) {
        if (this.dictionary) {
            let val: string = this.dictionary[key.toUpperCase()] || "";
            if (val === "") {
                console.log(`Chiave ${key} non trovata nel dizionario corrente`);
            } else {
                if (options) {
                    switch (options.case) {
                        case 'lower':
                            val = val.toLowerCase();
                            break;
                        case 'upper':
                            val = val.toUpperCase();
                            break;
                    }
                }
            }
            return val;
        }
        return "";
    }
    
    
    
    private _getLanguageStored(): Promise<{language: string}> {
        return new Promise(resolve => {
            this._sStorage.get(STORAGE_KEYS.DICTIONARY_LANGUAGE).then(language => {
                
                if (!language) {
                    this._getPreferredLanguage().then(language => {
                        this._sStorage.set(STORAGE_KEYS.DICTIONARY_LANGUAGE, language);
                        resolve({language});
                    });
                } else {
                    this._getPreferredLanguage().then(language_pref => {
                        if(language == language_pref){
                            resolve({language});
                        } else {
                            this._sStorage.set(STORAGE_KEYS.DICTIONARY_LANGUAGE, language_pref);
                            resolve({language_pref});
                        }
                    });
                    
                }
                
            });
        });
    }
    
    public _getPreferredLanguage(): Promise<string> {
        return new Promise(resolve => {
            this.globalization.getPreferredLanguage()
                .then(res => {
                    
                    resolve(res.value);
                })
                .catch(() => {
                    resolve(DICTIONARY_LANGUAGE_DEFAULT);
                });
        });
    }
    
    private _getDictionaryFromAssets(lang: string): Promise<any> {
        return new Promise((resolve, reject) => {
            //recupero il dizionario in assets/json
            this._http.get(`assets/lang/${lang}.json`).toPromise()
                .then((res: Response) => {
                    resolve(res.json());
                })
                .catch((err: Response) => {
                    console.log(`Dizionario non trovato: ${lang}`);
                    
                    if (lang !== DICTIONARY_LANGUAGE_DEFAULT) {
                        this._getDictionaryFromAssets(DICTIONARY_LANGUAGE_DEFAULT)
                            .then(dict => {
                                resolve(dict);
                            })
                            .catch(() => {
                                reject();
                            });
                    } else {
                        reject();
                    }
                    
                });
        });
    }

}
