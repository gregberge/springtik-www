export default ({routes, params}) => {
  const path = routes.reduce((complete, {path}) => {
    return path.startsWith('/')
      ? path
      : complete.endsWith('/')
        ? `${complete}${path}`
        : `${complete}/${path}`;
  }, '');

  return Object.entries(params)
    .reduce((path, [key, value]) => path.replace(`:${key}`, value), path);
};
