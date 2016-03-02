/* eslint no-sync: 0 */
import Sequelize from 'sequelize';
import config from './config';
import fs from 'fs';
import path from 'path';

const sequelize = new Sequelize(config.get('database.uri'));

// Require all models
const files = fs.readdirSync(path.join(__dirname, 'models'));
files.forEach(file =>
  require(`./models/${file}`).default(sequelize)
);

export default sequelize;
