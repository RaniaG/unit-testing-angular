import { Directive, ElementRef, Input, OnChanges } from "@angular/core";

@Directive({ selector: "[highlight]" })
/**
 * Set backgroundColor for the attached element to highlight color
 * and set the element's customProperty to true
 */
export class HighlightDirective implements OnChanges {
  defaultColor = "red";

  @Input("highlight") bgColor = "";

  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }

  ngOnChanges() {
    this.el.nativeElement.style.color = this.bgColor || this.defaultColor;
  }
}
