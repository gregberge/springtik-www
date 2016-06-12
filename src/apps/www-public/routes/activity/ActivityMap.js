import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import Marker from 'react-google-maps/lib/Marker';
import Map from '~/modules/ui-components/Map';
import styles from './ActivityMap.scss';
import FaSpinner from 'react-icons/lib/fa/spinner';

export const ActivityMap = ({
  position,
}) => (
  <section className={styles.activityMap}>
    <ScriptjsLoader
      hostname={'maps.googleapis.com'}
      pathname={'/maps/api/js'}
      query={{
        key: 'AIzaSyD4LvvTGzD59YskRDoiK1xtn9bvyvXnLRQ',
      }}
      loadingElement={
        <div className={styles.loader}>
          <FaSpinner className={styles.spinner} />
        </div>
      }
      containerElement={
        <div className={styles.map} />
      }
      googleMapElement={
        <Map defaultCenter={position}>
          <Marker position={position} />
        </Map>
      }
    />
  </section>
);

ActivityMap.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityMap);
