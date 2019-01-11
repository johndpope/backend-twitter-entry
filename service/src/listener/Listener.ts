import { Pipable, Message } from '../app/index'

export class Listener implements Pipable {
  /**
   * @inheritdoc
   */
  public receive (message: Message) : void {
    console.log(message)
  }
}
