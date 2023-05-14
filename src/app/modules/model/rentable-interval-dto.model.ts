export class RentableIntervalDTO {
    id: number = 0;
    accommodationId: number = 0;
    startTime: string = '';
    endTime: string = '';
    priceOfAccommodation: number = 0;
    pricePerGuest: number = 0;
    automaticAcceptance: boolean = false;

    public constructor(obj?: any) {
        if (obj) {
           this.id = obj.id;
           this.accommodationId = obj.accommodationId;
           this.startTime = obj.startTime;
           this.endTime = obj.endTime;
           this.priceOfAccommodation = obj.priceOfAccommodation;
           this.pricePerGuest = obj.pricePerGuest;
           this.automaticAcceptance = obj.automaticAcceptance;        
        }
    }
}
