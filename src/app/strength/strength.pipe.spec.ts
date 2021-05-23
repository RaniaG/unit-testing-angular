import { StrengthPipe } from "./strength.pipe"

describe('strengthPipe', () => {
    describe('transform', () => {
        let sut;

        beforeEach(() => {
            sut = new StrengthPipe();
        })

        it('should display weak when value = 5', () => {
            //Arrange
            //Act
            const result = sut.transform(5);
            //Assert
            expect(result).toContain('weak');
        })

        it('should display strong when value between 10 and 20', () => {
            //Arrange
            //Act
            const result = sut.transform(15);
            //Assert
            expect(result).toContain('strong');
        })

        it('should display unbelievable when value more than 20', () => {
            //Arrange
            //Act
            const result = sut.transform(25);
            //Assert
            expect(result).toContain('unbelievable');
        })
    })

})