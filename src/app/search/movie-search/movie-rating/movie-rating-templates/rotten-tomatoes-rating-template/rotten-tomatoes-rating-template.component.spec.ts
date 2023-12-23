import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RottenTomatoesRatingTemplateComponent } from './rotten-tomatoes-rating-template.component';
import { By } from '@angular/platform-browser';

describe('Testing Rotten Tomatoes rating template component', () => {
  let component: RottenTomatoesRatingTemplateComponent;
  let fixture: ComponentFixture<RottenTomatoesRatingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RottenTomatoesRatingTemplateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RottenTomatoesRatingTemplateComponent);
    component = fixture.componentInstance;

    component.rating = {
      source: 'source',
      value: '80%'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change color to green if rate is > 50%', () => {

    component.rating.value = '80%';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.color).toEqual('rgb(28, 141, 22)');

  });

  it('should change color to red if rate is < 50%', () => {

    component.rating.value = '20%';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.color).toEqual('rgb(141, 28, 22)');

  });

  it('should change color to yellow if rate is 50%', () => {

    component.rating.value = '50%';

    fixture.detectChanges();

    const ratingElement: HTMLParagraphElement = fixture.debugElement.query(By.css('.rating__value')).nativeElement;

    expect(ratingElement.style.color).toEqual('rgb(141, 141, 22)');

  });

});
