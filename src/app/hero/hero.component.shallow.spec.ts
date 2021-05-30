import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Hero } from "../hero";
import { HeroComponent } from "./hero.component";

@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" },
})
//to mock the router-link directive
class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe("Hero Component", () => {
  let fixture: ComponentFixture<HeroComponent>;
  let hero: Hero;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent, RouterLinkDirectiveStub],
      // schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroComponent);
    hero = { id: 0, name: "superman", strength: 10 };
  });

  it("should have the correct hero", () => {
    fixture.componentInstance.hero = hero;

    expect(fixture.componentInstance.hero.name).toBe(hero.name);
  });

  it("should render the hero name inside the anchor tag", () => {
    fixture.componentInstance.hero = hero;
    fixture.detectChanges(); //to update binding that exist on the component

    expect(fixture.nativeElement.querySelector("a").textContent).toContain(
      hero.name
    );

    expect(
      fixture.debugElement.query(By.css("a")).nativeElement.textContent
    ).toContain(hero.name);
  });

  it("should have the correct route for HeroDetail", () => {
    //Arrange
    fixture.componentInstance.hero = hero;

    let expectedLink = `/detail/${hero.id}`;

    let routerLink = fixture.debugElement
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    //Act
    fixture.detectChanges();
    fixture.debugElement.query(By.css("a")).triggerEventHandler("click", null);

    //Assert
    expect(routerLink.navigatedTo).toBe(expectedLink);
  });
});
