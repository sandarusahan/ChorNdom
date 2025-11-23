import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetronomeWidgetComponent } from './metronome-widget.component';

describe('MetronomeWidgetComponent', () => {
  let component: MetronomeWidgetComponent;
  let fixture: ComponentFixture<MetronomeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetronomeWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetronomeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
