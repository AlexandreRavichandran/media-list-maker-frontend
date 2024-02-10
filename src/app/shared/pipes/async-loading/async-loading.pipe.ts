import { Pipe, PipeTransform } from '@angular/core';
import { Observable, catchError, isObservable, map, of, startWith } from 'rxjs';
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
        this.changeErrorIfInternal(error);
        return of({ loading: false, error });
      }))
  }


  private changeErrorIfInternal(error: any) {

    if (this.isErrorInternal(error.status)) {
      error.message = "An error occured. Please try later";
    }

    return error;

  }

  private isErrorInternal(httpStatus: number) {

    const firstNumber: number = parseInt(httpStatus.toString()[0]);

    return firstNumber === 5;

  }
}
