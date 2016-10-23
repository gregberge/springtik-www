import mapProps from 'recompose/mapProps';
import compose from 'recompose/compose';
import omit from 'lodash/fp/omit';

export default compose(mapProps, omit);
