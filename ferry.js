export class Car {
    constructor(colour, passengerCount) {
        this.colour = colour;
        this.passengerCount = passengerCount;
        this.trips = 0; 
    }
}

export class Ferry {
    constructor(maxCars, maxPeople) {
        this.maxCars = maxCars;
        this.maxPeople = maxPeople;
        this.carCount = 0;
        this.peopleCount = 0;
        this.carColors = {}; 
        this.carRecords = new Map(); 
    }

    board(car) {
        if (this.carCount < this.maxCars && this.peopleCount + car.passengerCount <= this.maxPeople) {
            this.carCount++;
            this.peopleCount += car.passengerCount;

            
            if (!this.carColors[car.colour]) {
                this.carColors[car.colour] = 0;
            }
            this.carColors[car.colour]++;

           
            if (!this.carRecords.has(car)) {
                this.carRecords.set(car, 0);
            }
            const trips = this.carRecords.get(car) + 1;
            this.carRecords.set(car, trips);

            if (trips === 4) {
                return 'half price!';
            }
            if (trips === 8) {
                return 'you go free!';
            }
            return 'accepted';
        } else {
            return 'rejected';
        }
    }

    disembark(car) {
        if (this.carRecords.has(car)) {
            const trips = this.carRecords.get(car);
            this.carRecords.delete(car);
            this.carCount--;
            this.peopleCount -= car.passengerCount;

            if (this.carColors[car.colour]) {
                this.carColors[car.colour]--;
                if (this.carColors[car.colour] === 0) {
                    delete this.carColors[car.colour];
                }
            }
        }
    }

    getCarsByColor(color) {
        return this.carColors[color] || 0;
    }
}
