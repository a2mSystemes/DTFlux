import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchFinish2Component } from './arch-finish2.component';

describe('ArchFinish2Component', () => {
  let component: ArchFinish2Component;
  let fixture: ComponentFixture<ArchFinish2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchFinish2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchFinish2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
