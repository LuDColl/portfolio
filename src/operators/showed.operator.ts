import { distinctUntilChanged, filter, map, pipe } from 'rxjs';

export function showed() {
  return pipe(
    map((value) => !!value),
    distinctUntilChanged(),
    filter((showed) => showed)
  );
}
