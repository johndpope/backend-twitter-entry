
export class ActionBag {

  /**
   * Creates a post object for like Twitter action.
   *
   * @param {string|number} id
   * @return {any}
   */
  public static like (id: string|number) : any {
    return {
      url: `https://api.twitter.com/1.1/favorites/create.json`,
      params: { id }
    }
  }

  /**
   * Creates a post object for follow Twitter action.
   *
   * @param {string|number} id
   * @return {any}
   */
  public static follow (id: string|number) : any {
    return {
      url: `https://api.twitter.com/1.1/friendships/create.json?user_id=${id}&follow=false`,
      params: null
    }
  }

  /**
   * Creates a post object for retweet Twitter action.
   *
   * @param {string|number} id
   * @return {any}
   */
  public static retweet (id: string|number) : any {
    return {
      url: `https://api.twitter.com/1.1/statuses/retweet/${id}.json`,
      params: null
    }
  }

  /**
   * Router for methods.
   * @param method
   * @param id
   * @return {any}
   */
  public static from (method: string, id: string|number) : any {
    return ActionBag[method](id)
  }
}
