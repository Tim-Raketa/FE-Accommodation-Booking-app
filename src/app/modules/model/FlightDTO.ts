export class FlightDTO {
  id:number=0;
  dateTime: Date = new Date();
  startingLocation: string = '';
  destination: string = '';
  pricePerPerson: number = 0;
  totalPrice: number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.dateTime = obj.dateTime;
      this.startingLocation = obj.startingLocation;
      this.destination = obj.destination;
      this.pricePerPerson = obj.pricePerPerson;
      this.totalPrice = obj.totalPrice;
    }
  }

}
