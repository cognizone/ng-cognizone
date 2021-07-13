import { Subscription } from 'rxjs';

/**
 * Utility class used for handling rxjs subscription in a gracefull manner.
 */
export class SubSink {
  private subscriptions: Subscription[] = [];

  /**
   * Add a subscription to the pool of subscriptions. multiple calls can be made in succession, like
   * `mySubSink = timer(500).subscribe();`
   * `mySubSink = timer(1000).subscribe();`.
   * This was done to avoid having to wrap a subscription in a method call, like
   * `mySubSink.addInArray(timer(1000).subscribe());`
   */
  set add(value: Subscription) {
    this.subscriptions.push(value);
  }

  /**
   * Unsuscribe from all the added subscriptions and empties the internal pool.
   */
  empty(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
}
