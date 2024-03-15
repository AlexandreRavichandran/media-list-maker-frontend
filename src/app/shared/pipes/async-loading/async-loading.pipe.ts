import { Pipe, PipeTransform } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiError } from '../../error/api-error';

export interface AsyncLoadingResult<T> {

  value?: T;
  error?: ApiError;
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
        error: undefined,
        value: undefined
      })
    }

    return value.pipe(
      map((value: any) => {
        return {
          loading: false,
          error: undefined,
          value: value.type ? value.value : value
        }
      }),
      startWith({ loading: true }),
      catchError((error: ApiError) => {
        return of({ loading: false, error });
      }))
  }

}
