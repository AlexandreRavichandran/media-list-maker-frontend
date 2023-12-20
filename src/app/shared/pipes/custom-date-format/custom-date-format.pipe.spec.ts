import { CustomDateFormatPipe } from './custom-date-format.pipe';

describe('Testing date format pipe', () => {

  it('create an instance', () => {
    const pipe = new CustomDateFormatPipe();
    expect(pipe).toBeTruthy();
  });
  
});
