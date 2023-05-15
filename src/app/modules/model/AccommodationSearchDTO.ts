export class AccommodationSearchDTO {
    startDate: string = '';
    endDate: string = '';
    location: string = '';
    numberOfGuests: number = 0;

    public constructor(obj?: any) {
        if (obj) {
            this.startDate = obj.startDate;
            this.endDate = obj.endDate;
            this.location = obj.location;
            this.numberOfGuests = obj.numberOfGuests;      
        }
    }

}