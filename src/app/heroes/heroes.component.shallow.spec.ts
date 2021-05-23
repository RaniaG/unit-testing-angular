import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe("Heroes Component shallow", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;

  let heroesTestData;

  @Component({
    selector: "app-hero",
    template: "<div></div>",
  })
  class MockHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    heroesTestData = [
      { id: 1, name: "batman", strength: 10 },
      { id: 2, name: "flash", strength: 8 },
      { id: 3, name: "superman", strength: 9 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, MockHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should load heroes correcty", () => {
    //Arrange
    mockHeroService.getHeroes.and.returnValue(of(heroesTestData));
    //Act
    fixture.detectChanges(); //tofire the onInit
    //Assert
    expect(fixture.componentInstance.heroes.length).toBe(heroesTestData.length);
  });

  it("should create li for each hero", () => {
    //Arrange
    mockHeroService.getHeroes.and.returnValue(of(heroesTestData));

    //Act
    fixture.detectChanges();

    //Assert
    let ul = fixture.debugElement.queryAll(By.css("ul li"));
    expect(ul.length).toBe(heroesTestData.length);
  });
});
