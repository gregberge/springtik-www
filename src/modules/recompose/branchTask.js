import {Component} from 'react';
import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';

export default createHelper((taskSelector, choices) => BaseComponent => (
  class TaskBrancher extends Component {
    LeftComponent = null;
    RightComponent = null;

    constructor(props, context) {
      super(props, context);
      this.computeChildComponent(this.props);
    }

    computeChildComponent(props) {
      const task = taskSelector(props) || {};

      if (task.progress) {
        this.progressFactory = this.progressFactory || this.createFactory('progress');
        this.factory = this.progressFactory;
      } else if (task.error) {
        this.errorFactory = this.errorFactory || this.createFactory('error');
        this.factory = this.errorFactory;
      } else if (task.success) {
        this.successFactory = this.successFactory || this.createFactory('success');
        this.factory = this.successFactory;
      } else {
        this.defaultFactory = this.defaultFactory || this.createFactory('default');
        this.factory = this.defaultFactory;
      }
    }

    createFactory(type) {
      const choice = choices[type] || choices.default;

      if (typeof choice !== 'function') {
        throw new Error('Choice ${choice} for ${type} is not a function');
      }

      return createEagerFactory(choice(BaseComponent));
    }

    componentWillReceiveProps(nextProps) {
      this.computeChildComponent(nextProps);
    }

    render() {
      return this.factory(this.props);
    }
  }
), 'branchTask');
