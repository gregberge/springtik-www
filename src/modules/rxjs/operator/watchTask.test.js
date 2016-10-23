import {of} from 'rxjs/observable/of';
import {expect} from 'chai';
import {watchTask} from './watchTask';
import {subscribeAsync} from 'modules/rxjs/test/subscribeAsync';

describe('doctor.mobile.modules.rxjs.operator.watchTask', () => {
  it('should push progress state', () =>
    subscribeAsync(of(null)::watchTask(() => new Promise(() => {})), 1)
      .then(spy => {
        const [[{progress, success, error}]] = spy.args;
        expect(progress).to.be.true();
        expect(success).to.be.false();
        expect(error).to.be.false();
      }));

  it('should forward source argument', () =>
    subscribeAsync(of('foo')::watchTask(foo => new Promise(() =>
      expect(foo).to.equals('foo'))), 1));

  describe('given resolved promise', () => {
    it('should push success test', () =>
      subscribeAsync(of(null)::watchTask(() => Promise.resolve()), 2)
        .then(spy => {
          const [, [{progress, success, error}]] = spy.args;
          expect(progress).to.be.false();
          expect(success).to.be.true();
          expect(error).to.be.false();
        }));

    it('should push output', () =>
      subscribeAsync(of(null)::watchTask(() => Promise.resolve('bar')), 2)
        .then(spy => {
          const [, [{output}]] = spy.args;
          expect(output).to.equals('bar');
        }));
  });

  describe('given rejected promise', () => {
    it('should push error test', () =>
      subscribeAsync(of(null)::watchTask(() => Promise.reject()), 2)
        .then(spy => {
          const [, [{progress, success, error}]] = spy.args;
          expect(progress).to.be.false();
          expect(success).to.be.false();
          expect(error).to.be.true();
        }));

    it('should push output', () =>
      subscribeAsync(of(null)::watchTask(() => Promise.reject('bar')), 2)
        .then(spy => {
          const [, [{output}]] = spy.args;
          expect(output).to.equals('bar');
        }));
  });
});
