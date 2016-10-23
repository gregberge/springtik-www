import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import './add/operator/backoffRetry';
import './add/operator/debug';
import './add/operator/shareReplay';
import './add/operator/store';
import './add/operator/watchTask';

export default {
  BehaviorSubject,
  Observable,
  Subject,
};
