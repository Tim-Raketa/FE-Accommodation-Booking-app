export class AccommodationDTO {
    id: number = 0;
    name: string = '';
    location: string = '';
    perks: string = '';
    minGuests: number = 0;
    maxGuests: number = 0;
    hostId: string = '';

    public constructor(obj?: any) {
        if (obj) {
           this.id = obj.id;
           this.name = obj.name;
           this.location = obj.location;
           this.perks = obj.perks;
           this.minGuests = obj.minGuests;
           this.maxGuests = obj.maxGuests;
           this.hostId = obj.hostId;        
        }
    }
}
