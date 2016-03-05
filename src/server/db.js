import Knex from 'knex';
import knexConfig from '../../knexfile';
import {Model} from 'objection';
import config from '~/config';

const knex = Knex(knexConfig[config.get('env')]);

Model.knex(knex);
