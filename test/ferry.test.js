import { Car, Ferry } from '../ferry.js';
import { expect } from 'chai';

describe('Car Class', () => {
    it('should create a car with a specified color and passenger count', () => {
        const car = new Car('red', 4);
        expect(car.colour).to.equal('red');
        expect(car.passengerCount).to.equal(4);
        expect(car.trips).to.equal(0);
    });
});

describe('Ferry Class', () => {
    it('should initialize with specified max cars and max people allowed', () => {
        const ferry = new Ferry(5, 20);
        expect(ferry.carCount).to.equal(0);
        expect(ferry.peopleCount).to.equal(0);
    });

    it('should accept cars if the ferry is not full', () => {
        const ferry = new Ferry(2, 10);
        const car1 = new Car('red', 4);
        const car2 = new Car('blue', 3);
        expect(ferry.board(car1)).to.equal('accepted');
        expect(ferry.board(car2)).to.equal('accepted');
    });

    it('should reject cars if the ferry is full', () => {
        const ferry = new Ferry(2, 10);
        const car1 = new Car('red', 4);
        const car2 = new Car('blue', 3);
        const car3 = new Car('green', 5);
        ferry.board(car1);
        ferry.board(car2);
        expect(ferry.board(car3)).to.equal('rejected');
    });

    it('should reject cars if the people limit is exceeded', () => {
        const ferry = new Ferry(3, 7);
        const car1 = new Car('red', 4);
        const car2 = new Car('blue', 3);
        const car3 = new Car('green', 2);
        ferry.board(car1);
        ferry.board(car2);
        expect(ferry.board(car3)).to.equal('rejected');
    });

    it('should track number of cars of a certain color', () => {
        const ferry = new Ferry(5, 20);
        const car1 = new Car('red', 4);
        const car2 = new Car('red', 4);
        const car3 = new Car('blue', 4);
        ferry.board(car1);
        ferry.board(car2);
        ferry.board(car3);
        expect(ferry.getCarsByColor('red')).to.equal(2);
        expect(ferry.getCarsByColor('blue')).to.equal(1);
    });

    it('should update people and car counts correctly when a car leaves', () => {
        const ferry = new Ferry(5, 20);
        const car1 = new Car('red', 4);
        ferry.board(car1);
        ferry.disembark(car1);
        expect(ferry.carCount).to.equal(0);
        expect(ferry.peopleCount).to.equal(0);
    });

    it('should give a half price discount after 3 trips on the same ferry', () => {
        const ferry = new Ferry(5, 20);
        const car = new Car('red', 4);
        ferry.board(car);
        ferry.board(car);
        ferry.board(car);
        expect(ferry.board(car)).to.equal('half price!');
    });

   
});




