import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {TagCategory} from './tagCategory';
import {TAG_DB} from './tag_db';

@Injectable()
export class TagDatabaseService {

  constructor() { }

  getTagCategories(): Observable<TagCategory[]> {
    return of(TAG_DB);
  }

}
