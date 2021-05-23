import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Hero } from "../hero";
import { HeroComponent } from "./hero.component";

describe("Hero Component", () => {
  let fixture: ComponentFixture<HeroComponent>;
  let hero: Hero;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent], //only need to add the component we are testing
      schemas: [NO_ERRORS_SCHEMA],
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
});
