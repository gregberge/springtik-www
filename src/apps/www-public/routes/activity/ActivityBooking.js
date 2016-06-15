import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import FaPhone from 'react-icons/lib/fa/phone';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {formatPhoneNumber} from '~/modules/phone-number/phoneNumberFormatter';
import styles from './ActivityBooking.scss';

export const ActivityBooking = ({
  activity: {
    phoneNumber = '0169383622',
  },
}) => (
  <div className={styles.activityBooking}>
    <h2 className={styles.title}>
      Réserver l'activité
    </h2>
    {phoneNumber ? (
      <div className={styles.phoneSection}>
        <a href={`tel:${phoneNumber}`}>
          <FaPhone size={18} className={styles.phoneSectionIcon} />
          <span className={styles.phoneNumber}>
            {formatPhoneNumber(phoneNumber)}
          </span>
        </a>
      </div>
    ) : null}
  </div>
);

ActivityBooking.propTypes = {
  activity: PropTypes.shape({
    phoneNumber: PropTypes.string,
  }),
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityBooking);
