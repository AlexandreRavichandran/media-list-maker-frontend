import { TimestampToTimePipe } from './timestamp-to-time.pipe';

describe('Testing timestamp to time pipe', () => {

  it('create an instance', () => {
    const pipe = new TimestampToTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 00:41:41', () => {

    const pipe = new TimestampToTimePipe();

    const timestampToTime: string = pipe.transform(2501000);

    expect(timestampToTime).toEqual('00:41:41');

  });

  it('should return 01:00:41', () => {

    const pipe = new TimestampToTimePipe();

    const timestampToTime: string = pipe.transform(3641000);

    expect(timestampToTime).toEqual('01:00:41');

  });

  it('should return 01:41:00', () => {

    const pipe = new TimestampToTimePipe();

    const timestampToTime: string = pipe.transform(6060000);

    expect(timestampToTime).toEqual('01:41:00');

  });

});
