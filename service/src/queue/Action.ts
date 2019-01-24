import * as OAuth from 'oauth'
import { ActionConfig } from './ActionConfig'

export class Action {
  constructor (
    private client: OAuth,
    private config: ActionConfig
  ) {
    //
  }
}
