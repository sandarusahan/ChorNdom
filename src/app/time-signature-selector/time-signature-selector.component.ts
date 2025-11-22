import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-signature-selector',
  templateUrl: './time-signature-selector.component.html',
  styleUrls: ['./time-signature-selector.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
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
