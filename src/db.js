import Sequelize from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.get('database.uri'));

// Require all models
require('./models/activity').default(sequelize);

export default sequelize;
