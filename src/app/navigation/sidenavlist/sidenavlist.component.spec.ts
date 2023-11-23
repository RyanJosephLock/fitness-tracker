import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavlistComponent } from './sidenavlist.component';

describe('SidenavlistComponent', () => {
  let component: SidenavlistComponent;
  let fixture: ComponentFixture<SidenavlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavlistComponent]
    });
    fixture = TestBed.createComponent(SidenavlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
