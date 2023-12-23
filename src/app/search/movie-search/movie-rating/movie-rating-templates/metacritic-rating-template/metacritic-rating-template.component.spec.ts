import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetacriticRatingTemplateComponent } from './metacritic-rating-template.component';
import { By } from '@angular/platform-browser';

describe('Testing Metacritic rating template component', () => {

  let component: MetacriticRatingTemplateComponent;
  let fixture: ComponentFixture<MetacriticRatingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetacriticRatingTemplateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetacriticRatingTemplateComponent);
    component = fixture.componentInstance;

    component.rating = {
      source: 'source',
      value: '50/100'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change background color to green if rate is > 50/100', () => {

    component.rating.value = '80/100';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.backgroundColor).toEqual('rgb(28, 141, 22)');

  });

  it('should change background color to red if rate is < 50/100', () => {

    component.rating.value = '20/100';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.backgroundColor).toEqual('rgb(141, 28, 22)');

  });

  it('should change background color to yellow if rate is 50/100', () => {

    component.rating.value = '50/100';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.backgroundColor).toEqual('rgb(141, 141, 22)');

  });

});
