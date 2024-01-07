import { Observable, catchError, of, skip, throwError } from 'rxjs';
import { AsyncLoadingPipe, AsyncLoadingResult } from './async-loading.pipe';

describe('Testing async loading pipe', () => {

  it('create an instance', () => {
    const pipe = new AsyncLoadingPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return async result with value when observable is completed', () => {

    const testObservable: Observable<string> = of("test");

    const pipe = new AsyncLoadingPipe();

    const result: Observable<AsyncLoadingResult<string>> = pipe.transform(testObservable);

    result.pipe(skip(2)).subscribe(result => {
      expect(result.loading).toBeTrue();
    })

    result.pipe(skip(1)).subscribe(result => {
      expect(result.loading).toBeFalse();
      expect(result.value).toEqual("test");
      expect(result.error).toEqual("");
    })

  });

  it('should return async result with error when observable is completed', () => {

    const testObservable: Observable<string> = throwError(()=> new Error('Error'));

    const pipe = new AsyncLoadingPipe();

    const result: Observable<AsyncLoadingResult<string>> = pipe.transform(testObservable);

    result.pipe(skip(2)).subscribe(result => {
      expect(result.loading).toBeTrue();
    })

    result.pipe(skip(1)).subscribe(result => {
      expect(result.loading).toBeFalse();
      expect(result.value).toEqual(undefined);
      expect(result.error).toEqual("error");
    })

  });

});
