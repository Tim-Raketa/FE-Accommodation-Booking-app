export class newTicketDTO {
  flightId: number = 0;
  numberOfPeople: number = 0;
  email: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.flightId = obj.flightId;
      this.numberOfPeople = obj.numberOfPeople;
      this.email = obj.email;
    }
  }

}
