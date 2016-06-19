import React, {Component, PropTypes} from 'react';
import pure from 'recompose/pure';
import cl from '~/modules/cloudinary';

export class CloudinaryImage extends Component {
  static propTypes = {
    publicId: PropTypes.string.isRequired,
    options: PropTypes.object,
  }

  render() {
    const {
      publicId,
      options,
      ...other,
    } = this.props;

    return (
      <img {...other} src={cl.url(publicId, options)} />
    );
  }
}

export default pure(CloudinaryImage);
