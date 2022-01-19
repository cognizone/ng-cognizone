import { interval } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SubSink } from './sub-sink';

describe('SubSink', () => {
  it('should empty the sink', () => {
    const sink = new SubSink();
    const spy = jest.fn();

    const obs$ = interval(100).pipe(finalize(spy));
    sink.add = obs$.subscribe();
    sink.add = obs$.subscribe();
    sink.add = obs$.subscribe();
    sink.add = obs$.subscribe();

    sink.empty();

    expect(spy).toHaveBeenCalledTimes(4);
  });
});
