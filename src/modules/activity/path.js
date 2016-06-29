const PATH_REGEXP = /^([a-z0-9-]*)(\d+)$/;

export const formatPath = ({id, slug}) => `${slug}-${id}`;

export const parsePath = path => {
  const matches = path.match(PATH_REGEXP);

  if (!matches)
    return null;

  return {
    id: matches[2],
    path: matches[1],
  };
};
