import client from './Client'
import { Action } from './Action'
import { Persistor } from './Persistor'
import { Pipable, Message } from '../app/index'

export class Listener implements Pipable {
  constructor (private persistor: Persistor) {
    //
  }

  /**
   * @inheritdoc
   */
  public receive (message: Message) : void {
    const action: Action = new Action(client, message)


  }
}
