export class ReservationDTO {
    id: number = 0;
    name: string = '';
    location: string = '';
    numOfGuests: number = 0;
    startTime: string = '';
    endTime: string = '';

    public constructor(obj?: any) {
        if (obj) {
           this.id = obj.id;
           this.name = obj.name;
           this.location = obj.location;
           this.numOfGuests = obj.numOfGuests;
           this.startTime = obj.startTime;
           this.endTime = obj.endTime;       
        }
    }
}