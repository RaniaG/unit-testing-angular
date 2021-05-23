describe('class name', () => {
    let sut;

    beforeEach(() => {
        sut = {};
    })

    describe('method name', () => {
        it('should be true if true', () => {
            //Arrange
            sut.a = false;

            //Act
            sut.a = true;

            //Assert
            expect(sut.a).toBe(true);
        })
    })
})