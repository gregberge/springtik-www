const httpClient = {};

['get', 'post', 'put', 'patch', 'delete']
  .forEach(method => {
    httpClient[method] = () => {};
  });

export default () => httpClient;
