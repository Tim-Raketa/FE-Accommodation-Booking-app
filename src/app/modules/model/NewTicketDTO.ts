export class newTicketDTO {
  flightId: number = 0;
  numberOfPeople: number = 0;
  email: string = '';
  id:number=0;

  public constructor(obj?: any) {
    if (obj) {
      this.flightId = obj.flightId;
      this.numberOfPeople = obj.numberOfPeople;
      this.email = obj.email;
      this.id=0;
    }
  }

}
