import { from as fromRxjs, fromEvent as fromEventRx, ObservableInput, Observable } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'
import { Ref, isRef, watch, WatchOptions } from 'vue-demi'

export function from<T>(value: ObservableInput<T> | Ref<T>, options?: WatchOptions<T>): Observable<T> {
  if (isRef<T>(value)) {
    return new Observable((subscriber) => {
      watch(value, val => subscriber.next(val), options)
    })
  }
  else {
    return fromRxjs(value)
  }
}

export function fromEvent<T extends HTMLElement>(value: Ref<T>, event: string): Observable<Event> {
  return from(value).pipe(
    filter(value => value instanceof HTMLElement),
    mergeMap(value => fromEventRx(value, event)),
  )
}
