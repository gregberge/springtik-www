import {spy, stub} from 'sinon';
import {expect} from 'chai';
import Rx from '@doctolib/rx';
import {of} from 'rxjs/observable/of';
import {map} from 'rxjs/operator/map';
import {to5} from './to5';

describe('to5', () => {
  describe('with an rx5 observable', () => {
    let obs;

    beforeEach(() => {
      obs = of(true);
    });

    it('should return the observable', () => {
      expect(obs::to5()).to.equal(obs);
    });
  });

  describe('with an rx4 observable', () => {
    let obs;

    beforeEach(() => {
      obs = Rx.Observable.of(1);
    });

    it('should forward value', () => {
      const nextSpy = spy();

      obs
        ::to5()
        ::map(x => ++x)
        .subscribe(nextSpy);

      expect(nextSpy).to.be.calledWith(2);
    });

    it('should forward error', () => {
      const errorSpy = spy();
      const error = new Error('foo');

      obs
        .map(() => {
          throw error;
        })
        ::to5()
        .subscribe({
          error: errorSpy,
        });

      expect(errorSpy).to.be.calledWith(error);
    });

    it('should forward complete', () => {
      const completeSpy = spy();

      obs
        ::to5()
        .subscribe({
          complete: completeSpy,
        });

      expect(completeSpy).to.be.called();
    });

    it('should unsubscribe correctly', () => {
      const rx4Subscription = {
        dispose: spy(),
      };

      stub(obs, 'subscribe').returns(rx4Subscription);

      const rx5Subscription = obs::to5().subscribe();

      rx5Subscription.unsubscribe();

      expect(rx4Subscription.dispose).to.be.called();
    });
  });
});
