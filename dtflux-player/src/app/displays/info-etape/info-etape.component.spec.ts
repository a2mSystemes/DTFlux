import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEtapeComponent } from './info-etape.component';

describe('InfoEtapeComponent', () => {
  let component: InfoEtapeComponent;
  let fixture: ComponentFixture<InfoEtapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEtapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
