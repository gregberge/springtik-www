import {Cloudinary} from 'cloudinary-core';

const cl = new Cloudinary({
  cloud_name: 'springtik',
});

const clUrl = cl.url.bind(cl);

cl.url = (publicId, options = {}) => {
  let url = clUrl(publicId, options);

  if (options.dpr === 'auto') {
    url = url.replace('dpr_1.0', 'dpr_auto');
  }

  return url;
};

export default cl;
