import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSpinnerComponent } from './angular-spinner.component';

describe('AngularSpinnerComponent', () => {
  let component: AngularSpinnerComponent;
  let fixture: ComponentFixture<AngularSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
