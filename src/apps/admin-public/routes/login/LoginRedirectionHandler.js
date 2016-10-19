import {PropTypes} from 'react';
import {filter} from 'rxjs/operator/filter';
import subscribe from 'modules/observo/subscribe';

export default subscribe({
  observo: PropTypes.shape({
    observables: PropTypes.shape({
      result$: PropTypes.object.isRequired,
    }).isRequired,
  }),
  $window: PropTypes.shape({
    open: PropTypes.func.isRequired,
  }).isRequired,
}, ({
  observo,
  $window,
}) =>
  observo.observables.result$
    ::filter(({success, output}) => success && output && output.success)
    .subscribe(() => {
      $window.open('/', '_self');
    })
);
