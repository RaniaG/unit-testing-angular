import { inject, TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
describe("Hero Service", () => {
  let mockMessageService: MessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
    });
  });

  describe("getHero", () => {
    it("should call http get with the correct URL", inject(
      [HeroService, HttpTestingController],
      (heroService: HeroService, controller: HttpTestingController) => {
        //Arrange
        let heroId = 1;
        let correctURL = `api/heroes/${heroId}`;
        //Act
        heroService.getHero(heroId).subscribe();
        //Assert
        controller.expectOne(correctURL);
        controller.verify(); //so that any other requests made would fail the tests
      }
    ));
  });
});
