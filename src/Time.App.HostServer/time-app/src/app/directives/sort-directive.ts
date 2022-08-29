import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { SortDirection } from '../common/enum/sort-direction.enum';

@Directive({
  selector: '[riSort]'
})
export class SortDirective {

  @Output() sorted: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener('click')
  sortClickHandler(): void {

    const elem = this.targetElem.nativeElement;
    const field = elem.getAttribute('sort-field');
    let order = elem.getAttribute('sort-order');
    // const dataType = elem.getAttribute('sort-datatype');
    let newSortState: SortDirection;
    order = parseInt(order);
    if (isNaN(order)) {
      order = SortDirection.none;
    }
    switch (order) {
      case SortDirection.asc:
        newSortState = SortDirection.desc;
        break;
      case SortDirection.none:
        newSortState = SortDirection.asc;
        break;
      default:
        newSortState = SortDirection.none;
    }
    elem.setAttribute('sort-order', newSortState);
    this.sorted.emit({ name: field, state: newSortState });
  }
}


export interface SortEvent {
  name: string;
  state: SortDirection;
}
