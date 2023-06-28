import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hd1080Component } from './hd1080.component';

describe('Hd1080Component', () => {
  let component: Hd1080Component;
  let fixture: ComponentFixture<Hd1080Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hd1080Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hd1080Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
