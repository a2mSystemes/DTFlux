import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnArcheHComponent } from './column-arche-h.component';

describe('ColumnArcheHComponent', () => {
  let component: ColumnArcheHComponent;
  let fixture: ComponentFixture<ColumnArcheHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnArcheHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnArcheHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
