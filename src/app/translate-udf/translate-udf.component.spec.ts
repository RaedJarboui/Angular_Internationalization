import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateUdfComponent } from './translate-udf.component';

describe('TranslateUdfComponent', () => {
  let component: TranslateUdfComponent;
  let fixture: ComponentFixture<TranslateUdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateUdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateUdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
