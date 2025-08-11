import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-time-signature-selector',
  templateUrl: './time-signature-selector.component.html',
  styleUrls: ['./time-signature-selector.component.css']
})
export class TimeSignatureSelectorComponent {
  @Output() timeSignatureChange = new EventEmitter<{ numerator: number, denominator: number }>();

  numerator = 4;
  denominator = 4;

  onTimeSignatureChange() {
    this.timeSignatureChange.emit({ numerator: this.numerator, denominator: this.denominator });
  }

  setDenominator(d: number) {
    this.denominator = d;
    this.onTimeSignatureChange();
  }
}
