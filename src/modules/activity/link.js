import slugify from 'underscore.string/slugify';

const PATH_REGEXP = /^\/activities\/(\w+)-(\w+)-(\w+)-(\d+)$/;

export const formatLink = ({
  id,
  category,
  city,
  slug,
}) => `/activities/${slugify(city)}-${slugify(category)}-${slug}-${id}`;

export const parseLink = path => {
  const matches = path.match(PATH_REGEXP);

  if (!matches)
    return null;

  return {
    id: matches[4],
    category: matches[2],
    city: matches[1],
    slug: matches[3],
  };
};
