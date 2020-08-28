import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'dgv-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.scss'],
})
export class StateButtonComponent {

  @Input() value: boolean;

  @Input() description: string;
  @Input() tooltip: string;

  @Output() valueChange = new EventEmitter<boolean>();

  get buttonColor(): ThemePalette {
    return this.value ? 'primary' : undefined;
  }

  onClick() {
    this.value = !this.value;
    this.valueChange.emit(this.value);
  }
}
