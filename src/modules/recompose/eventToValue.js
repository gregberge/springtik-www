import withHandlers from 'recompose/withHandlers';

export default withHandlers({
  onChange: ({onChange}) => ({target: {value}}) => {
    if (onChange) {
      onChange(value);
    }
  },
});
