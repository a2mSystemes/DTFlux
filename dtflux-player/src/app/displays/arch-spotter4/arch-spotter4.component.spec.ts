import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchSpotter4Component } from './arch-spotter4.component';

describe('ArchSpotter4Component', () => {
  let component: ArchSpotter4Component;
  let fixture: ComponentFixture<ArchSpotter4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchSpotter4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchSpotter4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
