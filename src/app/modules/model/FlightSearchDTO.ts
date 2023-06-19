export class FlightSearchDTO {
  date: string = '';
  startingLocation: string = '';
  destination: string = '';
  numberOfPeople: number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.date = obj.date;
      this.startingLocation = obj.startingLocation;
      this.destination = obj.destination;
      this.numberOfPeople = obj.numberOfPeople;
    }
  }

}
