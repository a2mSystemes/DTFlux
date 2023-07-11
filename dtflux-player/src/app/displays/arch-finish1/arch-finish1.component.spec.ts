import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchFinish1Component } from './arch-finish1.component';

describe('ArchFinish1Component', () => {
  let component: ArchFinish1Component;
  let fixture: ComponentFixture<ArchFinish1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchFinish1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchFinish1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
