import {watchTask} from '~/modules/observables/operator/watchTask';
import {filter} from 'rxjs/operator/filter';
import {take} from 'rxjs/operator/take';
import {map} from 'rxjs/operator/map';
import gql from '~/apps/www-public/graphQLClient';

export default () => ({props$}) => {
  return {
    activity$: props$
      ::take(1)
      ::watchTask(() => gql.fetch({
        query: `
          {
            activity(id: "2") {
              name
              description
              text
              position {
                lat
                lng
              },
              siblings {
                id
                name
              }
            }
          }
        `,
      }))
      ::filter(({output}) => output)
      ::map(({output}) => output.data.activity),
  };
};
