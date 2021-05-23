import { MessageService } from "./message.service";

describe('messageService', () => {
    let sut;
    beforeEach(() => {
        sut = new MessageService();
    })

    describe('add', () => {
        it('should add new message', () => {
            //Arrange
            let message = 'new message';
            //Act
            sut.add(message);
            //Assert
            expect(sut.messages.length).toBe(1);
            expect(sut.messages).toContain(message);
        })
    })

    describe('clear', () => {
        it('should empty messages', () => {
            //Arrange
            sut.add('new message');
            //Act
            sut.clear();
            //Assert
            expect(sut.messages.length).toBe(0);
        })
    })

})