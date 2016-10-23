import {of} from 'rxjs/observable/of';
import {_do} from 'rxjs/operator/do';
import {map} from 'rxjs/operator/map';
import {expect} from 'chai';
import {spy} from 'sinon';
import {backoffRetry} from './backoffRetry';

describe('backoffRetry', () => {
  it('should retry 3 times with a delay between each call', done => {
    const tapSpy = spy();
    const errorSpy = spy();

    of(true)
      ::_do(tapSpy)
      ::map(() => {
        throw new Error();
      })
      ::backoffRetry(2, 50)
      .subscribe({error: errorSpy});

    expect(errorSpy).to.not.be.called;

    setTimeout(() => {
      expect(errorSpy).to.be.called;
      expect(tapSpy.callCount).to.equal(3);
      done();
    }, 400);
  });
});
