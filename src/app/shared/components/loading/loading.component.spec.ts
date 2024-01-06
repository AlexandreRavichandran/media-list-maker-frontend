import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Testing Loading component', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add spinnerColor color in spinner divs', () => {
    component.spinnerColor = '#FFFFFF';

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const spinnerDivs: DebugElement[] = element.queryAll(By.css('.loading__spinner div'));

    spinnerDivs.forEach(debugElement => {
      const div: HTMLDivElement = debugElement.nativeElement;
      expect(div.style.borderColor).toEqual('rgb(255, 255, 255)');
    })

  });



});
