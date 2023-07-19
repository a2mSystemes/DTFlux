import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFComponent } from './column-f.component';

describe('ColumnFComponent', () => {
  let component: ColumnFComponent;
  let fixture: ComponentFixture<ColumnFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
