import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnArcheFComponent } from './column-arche-f.component';

describe('ColumnArcheFComponent', () => {
  let component: ColumnArcheFComponent;
  let fixture: ComponentFixture<ColumnArcheFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnArcheFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnArcheFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
