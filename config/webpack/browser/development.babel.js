import '~/modules/bootstrap';
import generate from '../generators/browser/development';
export default [
  generate('admin-private'),
  generate('admin-public'),
];
