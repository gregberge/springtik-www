import {Observer} from 'rxjs-es/Observer';

export default class ActionLocator {
  actions = [];

  /**
   * Get an existing action or create it.
   *
   * @param {string} name
   * @returns {Rx.Subject}
   */
  get(name) {
    this.actions[name] = this.actions[name] || new Observer();
    return this.actions[name];
  }

  /**
   * Trigger a new action.
   *
   * @param {string} name
   * @param {*} value
   */
  trigger(name, value) {
    this.get(name).next(value);
  }
}
