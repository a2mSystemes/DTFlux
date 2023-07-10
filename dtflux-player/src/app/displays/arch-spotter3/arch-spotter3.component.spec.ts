import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchSpotter3Component } from './arch-spotter3.component';

describe('ArchSpotter3Component', () => {
  let component: ArchSpotter3Component;
  let fixture: ComponentFixture<ArchSpotter3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchSpotter3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchSpotter3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
