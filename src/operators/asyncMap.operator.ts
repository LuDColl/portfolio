import { distinctUntilChanged, mergeMap, pipe } from 'rxjs';

export function asyncMap<T, S>(promise: (item: T) => Promise<S>) {
  return pipe(mergeMap(promise), distinctUntilChanged());
}
