
export class Response {

  /**
   * @constructor
   *
   * @param {any} error
   * @param {any} body
   * @param {any} req
   */
  constructor (
    private error: any,
    private body: any,
    private req: any
  ) {
    console.log(error, body, req)
  }
}
