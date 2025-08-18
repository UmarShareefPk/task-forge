import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}
  /**
   * Listens for click events on the document.
   * If the clicked element is not inside the directive's host element,
   * it emits the clickOutside event.
   */

@HostListener('document:click', ['$event.target'])
public onClick(targetElement: EventTarget | null) {
  //console.log("Document click detected", targetElement);

  if (!(targetElement instanceof HTMLElement)) {
    return;
  }

  const clickedInside = this.elementRef.nativeElement.contains(targetElement);
  if (!clickedInside) {
   // console.log("Click was outside → emitting");
    this.clickOutside.emit();
  } else {
   // console.log("Click was inside → nothing emitted");
  }
}
}
