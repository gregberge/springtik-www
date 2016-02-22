import gulp from 'gulp';
import fs from 'fs';

const files = fs.readdirSync('./gulp-tasks');
files.forEach(file =>
  require(`./gulp-tasks/${file}`).default(gulp)
);
