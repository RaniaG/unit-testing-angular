import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe("heroes", () => {
  let sut: HeroesComponent;
  let heroes;
  let mockHeroService: HeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    sut = new HeroesComponent(mockHeroService);

    heroes = [
      { id: 1, name: "batman", strength: 10 },
      { id: 2, name: "flash", strength: 8 },
      { id: 3, name: "superman", strength: 9 },
    ];
  });

  describe("delete", () => {
    it("should remove hero object from heroes", () => {
      //Arrange
      sut.heroes = heroes;
      let heroToDelete = heroes[0];
      mockHeroService.deleteHero.and.returnValue(of(true));
      //Act
      sut.delete(heroToDelete);
      //Assert
      expect(sut.heroes.length).toBe(2);
    });

    it("should call heroService delete method", () => {
      //Arrange
      sut.heroes = heroes;
      let heroToDelete = heroes[0];
      mockHeroService.deleteHero.and.returnValue(of(true));
      //Act
      sut.delete(heroToDelete);
      //Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledTimes(1);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroToDelete);
    });
    xit("should be ignored", () => {
      //Arrange
      sut.heroes = heroes;
      let heroToDelete = heroes[0];
      mockHeroService.deleteHero.and.returnValue(of(true));
      //Act
      sut.delete(heroToDelete);
      //Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledTimes(2);
    });
  });
});
