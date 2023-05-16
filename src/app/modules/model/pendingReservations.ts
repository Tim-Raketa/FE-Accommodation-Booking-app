export class PendingReservations {
    startDate: string = '';
    endDate: string = '';
    numberOfGuests: number = 0;
    username: string = '';
    getCancelCount: number = 0;
    accommodationId: number = 0;
    id: number = 0;

    public constructor(obj?: any) {
        if (obj) {
            this.startDate = obj.startDate;
            this.endDate = obj.endDate;
            this.username = obj.username;
            this.numberOfGuests = obj.numberOfGuests;       
            this.getCancelCount = obj.getCancelCount;  
            this.accommodationId = obj.accommodationId;  
            this.id = obj.id;  
        }
    }

}