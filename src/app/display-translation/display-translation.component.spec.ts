import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTranslationComponent } from './display-translation.component';

describe('DisplayTranslationComponent', () => {
  let component: DisplayTranslationComponent;
  let fixture: ComponentFixture<DisplayTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
