import { Directive, ElementRef, HostListener } from '@angular/core';
import { snowActivation } from '@app/core/store/actions/snow.actions';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[dgvSnowInput]'
})
export class SnowInputDirective {

  constructor(private elementRef: ElementRef, private store: Store) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    const value = `${this.elementRef.nativeElement.value}${e.key}`.toLocaleLowerCase();
    if (value.toLocaleLowerCase() === 'pantoufle') {
      this.store.dispatch(snowActivation());
    }
  }
}
