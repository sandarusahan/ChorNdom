import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSignatureSelectorComponent } from './time-signature-selector.component';

describe('TimeSignatureSelectorComponent', () => {
  let component: TimeSignatureSelectorComponent;
  let fixture: ComponentFixture<TimeSignatureSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSignatureSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSignatureSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
