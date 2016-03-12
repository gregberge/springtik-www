import Rx from 'rxjs/Rx';

const capitalizeFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1);

const purifyKey = str =>
  str.replace(/\$$/, '');

export default (object, {startWithUndefined} = {}) => {
  const propKeys = Object.keys(object);
  let propSequences;

  if (startWithUndefined)
    propSequences = propKeys.map(key => object[key].startWith(undefined));
  else
    propSequences = propKeys.map(key => object[key]);

  return Rx.Observable.combineLatest(
    ...propSequences,
    (...propValues) => propKeys.reduce((props, key, i) => {
      if (object[key].next) {
        const onKey = `on${capitalizeFirstLetter(purifyKey(key))}`;
        props[onKey] = object[key].next.bind(object[key]);
      }

      props[purifyKey(key)] = propValues[i];
      return props;
    }, {})
  );
};
