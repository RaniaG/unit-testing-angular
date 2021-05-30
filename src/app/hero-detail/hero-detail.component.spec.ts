import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from "@angular/common";

describe("Hero Detail", () => {
  let mockHeroService, mockLocation, mockActivatedRoute;
  let fixture: ComponentFixture<HeroDetailComponent>;
  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => "3" } },
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of(undefined));
  });

  it("should render hero name in h2 tag", () => {
    //Arrange
    const hero = { id: 2, name: "superman", strength: 20 };
    mockHeroService.getHero.and.returnValue(of(hero));
    //Act
    fixture.detectChanges();
    //Assert
    let text = fixture.debugElement.query(By.css("h2")).nativeElement
      .textContent;
    expect(text).toBe(`${hero.name.toUpperCase()} Details`);
  });
});
