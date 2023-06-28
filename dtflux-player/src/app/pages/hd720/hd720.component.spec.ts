import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hd720Component } from './hd720.component';

describe('Hd720Component', () => {
  let component: Hd720Component;
  let fixture: ComponentFixture<Hd720Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hd720Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hd720Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
