import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamFullComponent } from './stream-full.component';

describe('StreamFullComponent', () => {
  let component: StreamFullComponent;
  let fixture: ComponentFixture<StreamFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
