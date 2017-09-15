import { Pipe, PipeTransform } from '@angular/core';

import { DictionaryServiceProvider } from '../../providers/dictionary-service/dictionary-service';
/**
 * Generated class for the DictionaryPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dictionary',
})
export class DictionaryPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
   
   constructor(
        private sDictionary: DictionaryServiceProvider
      ) {
  }
   
  transform(value: string, ...args){
      let new_val; 
      return this.sDictionary.load().then(()=>{
          new_val = this.sDictionary.get(value);
          return new_val;
      })
  }
}
