export class AccommodationDTO {
    name: string = '';
    location: string = '';
    perks: string = '';
    minGuests: number = 0;
    maxGuests: number = 0;

    public constructor(obj?: any) {
        if (obj) {
           this.name = obj.name;
           this.location = obj.location;
           this.perks = obj.perks;
           this.minGuests = obj.minGuests;
           this.maxGuests = obj.maxGuests;        
        }
    }
}
