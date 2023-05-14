export class ReservationIdsDTO {
    id: number = 0;
    numberOfGuests: number = 0;
    startDate: string = '';
    endDate: string = '';
    getCancelCount: number = 0;
    accommodationId: number = 0;
    username: string = '';

    public constructor(obj?: any) {
        if (obj) {
           this.id = obj.id;
           this.numberOfGuests = obj.numberOfGuests;
           this.startDate = obj.startDate;
           this.endDate = obj.endDate;   
           this.getCancelCount = obj.getCancelCount;
           this.accommodationId = obj.accommodationId;
           this.username = obj.username;    
        }
    }
}