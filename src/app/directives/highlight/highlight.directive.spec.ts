import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { HighlightDirective } from "./highlight.directive";
import { By } from "@angular/platform-browser";
@Component({
  template: ` <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [highlight]="box.value" value="cyan" />`,
})
class TestComponent {}

describe("Highlight Directive", () => {
  let fixture;
  let highlightedElements;
  let nonHighlightedElements;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    // all elements with an attached HighlightDirective
    highlightedElements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    // the h2 without the HighlightDirective
    nonHighlightedElements = fixture.debugElement.queryAll(
      By.css(":not([highlight])")
    );
  });

  // color tests
  it("should have three highlighted elements", () => {
    expect(highlightedElements.length).toBe(3);
  });

  it('should color 1st <h2> color "yellow"', () => {
    const color = highlightedElements[0].nativeElement.style.color;
    expect(color).toBe("yellow");
  });

  it("should color 2nd <h2> color w/ default color", () => {
    const dir = highlightedElements[1].injector.get(
      HighlightDirective
    ) as HighlightDirective;
    const color = highlightedElements[1].nativeElement.style.color;
    expect(color).toBe(dir.defaultColor);
  });

  it("should bind <input> color to value color", () => {
    // easier to work with nativeElement
    const input = highlightedElements[2].nativeElement as HTMLInputElement;
    expect(input.style.color).toBe("cyan", "initial color");

    input.value = "green";

    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(input.style.color).toBe("green", "changed color");
  });

  it("bare <h2> should not have a customProperty", () => {
    let bareH2 = nonHighlightedElements[0];
    expect(bareH2.properties.customProperty).toBeUndefined();
  });
});
