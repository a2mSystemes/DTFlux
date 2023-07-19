import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnWinnerComponent } from './column-winner.component';

describe('ColumnWinnerComponent', () => {
  let component: ColumnWinnerComponent;
  let fixture: ComponentFixture<ColumnWinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnWinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
