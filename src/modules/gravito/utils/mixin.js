export default (Component, mixins) => {
  const mixinMethod = (context, method, args = []) => {
    return mixins.reduce((res, mixin) => {
      if (mixin[method])
        return mixin[method].apply(context, args);

      return res;
    }, null);
  };

  return class extends Component {
    constructor(...args) {
      super(...args);
      mixinMethod(this, 'initialize', args);
    }

    componentWillMount() {
      mixinMethod(this, 'componentWillMount');
    }

    componentDidMount() {
      mixinMethod(this, 'componentDidMount');
    }

    componentWillReceiveProps(...args) {
      mixinMethod(this, 'componentWillReceiveProps', args);
    }

    componentWillUnmount() {
      mixinMethod(this, 'componentWillUnmount');
    }
  };
};
