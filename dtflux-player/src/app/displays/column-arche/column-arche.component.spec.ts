import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnArcheComponent } from './column-arche.component';

describe('ColumnArcheComponent', () => {
  let component: ColumnArcheComponent;
  let fixture: ComponentFixture<ColumnArcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnArcheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnArcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
