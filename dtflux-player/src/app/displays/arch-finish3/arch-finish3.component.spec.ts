import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchFinish3Component } from './arch-finish3.component';

describe('ArchFinish3Component', () => {
  let component: ArchFinish3Component;
  let fixture: ComponentFixture<ArchFinish3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchFinish3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchFinish3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
