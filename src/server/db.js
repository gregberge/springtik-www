import Knex from 'knex';
import knexConfig from '../../knexfile';
import {Model} from 'objection';

const knex = Knex(knexConfig.development);

Model.knex(knex);
