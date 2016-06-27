export const formatWebsite = website => {
  return website.replace(/^http:\/\//, '').replace(/\/$/, '');
};
