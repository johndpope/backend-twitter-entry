import { Method } from './Method'

export interface ActionConfig {

  /**
   * Which twitter method this action is.
   *
   * @var {Method}
   */
  method: Method

  /**
   * Identifier associated with the method.
   *
   * @var {string}
   */
  id: string

  /**
   * User token for OAuth.
   *
   * @var {string}
   */
  token: string

  /**
   * User secret token for OAuth.
   *
   * @var {string}
   */
  tokenSecret: string
}
