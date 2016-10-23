import provide from './provide';

export default form => provide(({
  props$,
  [`${form}Submit$`]: submit$,
}) => {
  const onSubmit = event => {
    event.preventDefault();
    submit$.next();
  };

  return {
    props$: props$.map(props => ({...props, onSubmit})),
  };
});
