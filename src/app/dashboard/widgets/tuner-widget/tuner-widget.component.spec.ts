import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TunerWidgetComponent } from './tuner-widget.component';

describe('TunerWidgetComponent', () => {
  let component: TunerWidgetComponent;
  let fixture: ComponentFixture<TunerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TunerWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TunerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
