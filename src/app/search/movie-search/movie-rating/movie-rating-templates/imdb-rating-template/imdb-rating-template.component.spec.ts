import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImdbRatingTemplateComponent } from './imdb-rating-template.component';
import { By } from '@angular/platform-browser';

describe('Testing IMDb rating template component', () => {

  let component: ImdbRatingTemplateComponent;
  let fixture: ComponentFixture<ImdbRatingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImdbRatingTemplateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImdbRatingTemplateComponent);
    component = fixture.componentInstance;

    component.rating = {
      source: 'source',
      value: '7/10'
    };

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change color to green if rate is > 5/10', () => {

    component.rating.value = '8/10';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.color).toEqual('rgb(28, 141, 22)');

  });

  it('should change color to red if rate is < 5/10', () => {

    component.rating.value = '2/10';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.color).toEqual('rgb(141, 28, 22)');

  });

  it('should change color to yellow if rate is 5/10', () => {

    component.rating.value = '5/10';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.color).toEqual('rgb(141, 141, 22)');

  });

  it('should remove decimal if decimal is zero', () => {

    component.rating.value = '5.0/10';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.textContent).toEqual('5/10');

  });

  it('should let decimal if decimal is different to zero', () => {

    component.rating.value = '5.6/10';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.textContent).toEqual('5.6/10');

  });

});
