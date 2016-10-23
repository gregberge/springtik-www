import {spy} from 'sinon';
import {expect} from 'chai';
import {from} from 'rxjs/observable/from';
import {store} from './store';

describe('store', () => {
  it('should operate on values using a scan', () => {
    const subscribeSpy = spy();

    const addOne = value => value + 1;
    const addTwo = value => value + 2;

    from([1, addOne, addTwo])
      ::store()
      .subscribe(subscribeSpy);

    expect(subscribeSpy).to.be.calledThrice();
    expect(subscribeSpy).to.be.calledWith(1);
    expect(subscribeSpy).to.be.calledWith(2);
    expect(subscribeSpy).to.be.calledWith(4);
  });
});
