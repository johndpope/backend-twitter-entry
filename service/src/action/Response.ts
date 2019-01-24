
export class Response {

  /**
   * @constructor
   *
   * @param {any} error
   * @param {any} body
   * @param {any} info
   */
  constructor (
    private error: any,
    private body: any,
    private info: any
  ) {
    console.log(error, body, info)
  }
}
