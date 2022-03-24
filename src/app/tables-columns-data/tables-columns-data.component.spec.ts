import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesColumnsDataComponent } from './tables-columns-data.component';

describe('TablesColumnsDataComponent', () => {
  let component: TablesColumnsDataComponent;
  let fixture: ComponentFixture<TablesColumnsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesColumnsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesColumnsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
