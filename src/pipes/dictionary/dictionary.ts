import { Pipe, PipeTransform } from '@angular/core';

import { DictionaryServiceProvider } from '../../providers/dictionary-service/dictionary-service';
import {OptionsGetDictionary} from '../../dictionary/types';
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
   
  transform(value: string, args?){
      let option: OptionsGetDictionary;
      if(args.case == 'lower' || args.case == 'upper') {
          return this.sDictionary.get(value, option = {case: args.case});
      } else {
          return this.sDictionary.get(value);
      }

  }
}
