import { CustomDateFormatPipe } from './custom-date-format.pipe';

describe('Testing date format pipe', () => {

  it('create an instance', () => {
    const pipe = new CustomDateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return date to format "dd-MM-yyyy"', () => {

    const date: Date = new Date(0);
    const pipe = new CustomDateFormatPipe();

    const testGetFormattedDate: string | null = pipe.transform(date);

    expect(testGetFormattedDate).toBeTruthy();
    expect(testGetFormattedDate).toEqual('01-01-1970');

  });

});
