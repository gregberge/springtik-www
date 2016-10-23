import {Observable} from 'rxjs/Observable';
import {backoffRetry} from '../../operator/backoffRetry';

Observable.prototype.backoffRetry = backoffRetry;
