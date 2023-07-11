import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchSpotter2Component } from './arch-spotter2.component';

describe('ArchSpotter2Component', () => {
  let component: ArchSpotter2Component;
  let fixture: ComponentFixture<ArchSpotter2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchSpotter2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchSpotter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
