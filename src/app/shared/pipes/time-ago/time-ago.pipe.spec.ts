import { TimeAgoPipe } from './time-ago.pipe';

describe('Testing time ago pipe', () => {

  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return right time ago format in singular', () => {

    const pipe = new TimeAgoPipe();
    const date: Date = new Date();
    date.setHours(new Date().getHours() - 1);
    const testGetTimeAgo: string | null = pipe.transform(date);

    expect(testGetTimeAgo).toBeTruthy();
    expect(testGetTimeAgo).toEqual('1 hour ago');

  })

  it('should return right time ago format in plural', () => {

    const pipe = new TimeAgoPipe();
    const date: Date = new Date();
    date.setMonth(new Date().getMonth() - 4);
    const testGetTimeAgo: string | null = pipe.transform(date);

    expect(testGetTimeAgo).toBeTruthy();
    expect(testGetTimeAgo).toEqual('4 months ago');

  })

  it('should return null if value is too low', () => {

    const pipe = new TimeAgoPipe();
    const date: Date = new Date();
    date.setMilliseconds(new Date().getMilliseconds() - 100);
    const testGetTimeAgo: string | null = pipe.transform(date);

    expect(testGetTimeAgo).toBeNull();

  })

});
