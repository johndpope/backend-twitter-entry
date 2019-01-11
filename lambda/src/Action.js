
/**
 * Twitter action class.
 */
module.exports = class Action {
  /** @var {string} method */
  /** @var {string|number} id */

  /**
   * Supported Twitter actions.
   *
   * @return {string[]}
   */
  static get list () {
    return ['like', 'retweet', 'follow']
  }

  /**
   * Builds Action instance.
   *
   * @param {any} data
   * @return {Action}
   */
  static from (data) {
    if (data && typeof data === 'object') {
      return new Action(data.method, data.id)
    }

    throw ({ status: 422, error: 'MissingParameters' })
  }

  /**
   * @constructor
   *
   * @param {string} method
   * @param {string|number} id
   */
  constructor (method, id) {
    if (!Action.list.includes(method) || !id) {
      throw ({ status: 422, error: 'InvalidActions' })
    }

    this.method = method
    this.id = id
  }

  /**
   * Parses action into JSON.
   *
   * @return {string}
   */
  toMessage () {
    return {
      method: this.method,
      id: this.id,
    }
  }
}
