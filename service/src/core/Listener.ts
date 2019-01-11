import client from './Client'
import { Action } from './Action'
import { Pipable, Message } from '../app/index'

export class Listener implements Pipable {
  /**
   * @inheritdoc
   */
  public receive (message: Message) : void {
    const action = new Action(client, message)
  }
}
