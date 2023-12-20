import { TimeAgoPipe } from './time-ago.pipe';

describe('Testing time ago pipe', () => {

  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });
  
});
