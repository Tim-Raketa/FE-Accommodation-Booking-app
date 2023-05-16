export class CreateReservationDTO {
    startDate: string = '';
    endDate: string = '';
    numberOfGuests: number = 0;
    accommodationId: number = 0;
    username: string = '';

    public constructor(obj?: any) {
        if (obj) {
            this.startDate = obj.startDate;
            this.endDate = obj.endDate;
            this.username = obj.username;
            this.numberOfGuests = obj.numberOfGuests;      
            this.accommodationId = obj.accommodationId; 
        }
    }

}