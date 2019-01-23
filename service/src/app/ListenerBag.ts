
export class ListenerBag<T> {

  /**
   * Array of listeners.
   *
   * @var {((t: T) => void)[]}
   */
  private listeners: ((t: T) => void)[]

  /**
   * Pushes a new listeners to the array.
   *
   * @param {(t: T) => void} listener
   */
  public addListener (listener: (t: T) => void) : void {
    this.listeners.push(listener)
  }

  /**
   * Fires the event.
   *
   * @param {T} event
   */
  public dispatch (event: T) : void {
    this.listeners.forEach(l => l(event))
  }
}
