import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchSpotter1Component } from './arch-spotter1.component';

describe('ArchSpotter1Component', () => {
  let component: ArchSpotter1Component;
  let fixture: ComponentFixture<ArchSpotter1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchSpotter1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchSpotter1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
