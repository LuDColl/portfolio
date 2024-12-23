import { FormControl } from '@angular/forms';
import { distinctUntilChanged, startWith } from 'rxjs';

export function startValue$<T>(control: FormControl<T>) {
  return control.valueChanges.pipe(
    startWith(control.value),
    distinctUntilChanged()
  );
}
