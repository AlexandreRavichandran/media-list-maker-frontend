import { TestBed } from '@angular/core/testing';

import { StateInitializerService } from './state-initializer.service';
import { AppModule } from 'src/app/app.module';

describe('Testing state initializer service', () => {

  let service: StateInitializerService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    });

    service = TestBed.inject(StateInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
