import {Observable} from 'rxjs/Observable';
import {store} from '../../operator/store';

Observable.prototype.store = store;
