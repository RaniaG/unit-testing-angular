import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { from, of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe("Heroes Component deep", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;

  let heroesTestData;

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
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as HeroComponent", () => {
    //Arrange
    mockHeroService.getHeroes.and.returnValue(of(heroesTestData)); //needed for onInit
    //Act
    fixture.detectChanges(); //will trigger onInit on HeroesComponent and all its child components
    //Assert
    expect(
      fixture.debugElement.queryAll(By.directive(HeroComponent)).length
    ).toBe(heroesTestData.length);
  });

  it("should render each hero name as HeroComponent name", () => {
    //Arrange
    mockHeroService.getHeroes.and.returnValue(of(heroesTestData)); //needed for onInit
    //Act
    fixture.detectChanges(); //will trigger onInit on HeroesComponent and all its child components
    //Assert
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponents.forEach((hero) => {
      expect(heroesTestData.map((e) => e.name)).toContain(
        hero.componentInstance.hero.name
      );
    });
  });

  it("should call delete method when button is clicked in HeroComponent", () => {
    //Arrange
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(heroesTestData));
    //Act
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponents[0]
      .query(By.css("button.delete"))
      .triggerEventHandler("click", { stopPropagation: () => {} });
    //Assert
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(
      heroesTestData[0]
    );
  });

  it("should call deleteHero when delete is called", () => {
    //Arrange
    mockHeroService.getHeroes.and.returnValue(of(heroesTestData));
    let heroToDelete = heroesTestData[0];
    mockHeroService.deleteHero.and.returnValue(of(heroToDelete));
    //Act
    fixture.detectChanges();
    fixture.componentInstance.delete(heroToDelete);
    //Assert
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroToDelete);
  });
});
