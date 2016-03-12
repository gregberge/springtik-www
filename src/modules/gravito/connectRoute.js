export default ({store}, WrappedComponent) => {
  WrappedComponent.routeStore = store;
  return WrappedComponent;
};
