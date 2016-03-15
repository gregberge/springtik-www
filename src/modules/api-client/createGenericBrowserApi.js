export default (name, {httpClient}) => {
  const baseUrl = `/api/${name}`;

  return {
    fetch() {
      return httpClient.get(baseUrl)
        .then(({bodyData}) => bodyData);
    },
    create(body) {
      return httpClient.post(baseUrl, {body})
        .then(({bodyData}) => bodyData);
    }
  };
};
