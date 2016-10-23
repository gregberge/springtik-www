import {Observable} from 'rxjs/Observable';
import {shareReplay} from '../../operator/shareReplay';

Observable.prototype.shareReplay = shareReplay;
