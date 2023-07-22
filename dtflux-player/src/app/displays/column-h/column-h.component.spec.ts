import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnHComponent } from './column-h.component';

describe('ColumnHComponent', () => {
  let component: ColumnHComponent;
  let fixture: ComponentFixture<ColumnHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
