import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesColumnsComponent } from './tables-columns.component';

describe('TablesColumnsComponent', () => {
  let component: TablesColumnsComponent;
  let fixture: ComponentFixture<TablesColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
