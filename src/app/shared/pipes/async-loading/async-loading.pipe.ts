import { Pipe, PipeTransform } from '@angular/core';
import { Observable, catchError, isObservable, map, of, startWith } from 'rxjs';

export interface AsyncLoadingResult<T> {

  value?: T;
  error?: string;
  loading?: boolean

}

@Pipe({
  name: 'asyncLoading'
})
export class AsyncLoadingPipe implements PipeTransform {

  transform<T = any>(value: Observable<T>): Observable<AsyncLoadingResult<T>> {

    if (!value) {
      return of({
        loading: true,
        error: "",
        value: undefined
      })
    }

    return value.pipe(
      map((value: any) => {
        return {
          loading: false,
          error: value.type === "error" ? "" : "",
          value: value.type ? value.value : value
        }
      }),
      startWith({ loading: true }),
      catchError(error => of({ loading: false, error: typeof error === 'string' ? error : "error" })))
  }

}
