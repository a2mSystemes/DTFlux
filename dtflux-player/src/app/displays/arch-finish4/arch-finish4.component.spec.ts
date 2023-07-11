import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchFinish4Component } from './arch-finish4.component';

describe('ArchFinish4Component', () => {
  let component: ArchFinish4Component;
  let fixture: ComponentFixture<ArchFinish4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchFinish4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchFinish4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
