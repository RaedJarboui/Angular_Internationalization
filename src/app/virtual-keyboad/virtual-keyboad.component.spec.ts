import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualKeyboadComponent } from './virtual-keyboad.component';

describe('VirtualKeyboadComponent', () => {
  let component: VirtualKeyboadComponent;
  let fixture: ComponentFixture<VirtualKeyboadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualKeyboadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualKeyboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
