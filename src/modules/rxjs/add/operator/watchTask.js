import {Observable} from 'rxjs/Observable';
import {watchTask} from '../../operator/watchTask';

Observable.prototype.watchTask = watchTask;
