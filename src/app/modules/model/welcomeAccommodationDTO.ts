export class welcomeAccommodationDTO {
    accommodationId: number = 0;
    name: string = '';
    location: string = '';
    perks: string = '';
    totalPrice: number = 0;
    priceOfAccommodation: number = 0;
    pricePerGuest: number = 0;
    numberOfGuests: number = 0;
    minGuests: number = 0;
    maxGuests: number = 0;

    public constructor(obj?: any) {
        if (obj) {
            this.accommodationId = obj.accommodationId;
            this.name = obj.name;
            this.location = obj.location;
            this.perks = obj.perks;
            this.totalPrice = obj.totalPrice;
            this.priceOfAccommodation = obj.priceOfAccommodation;
            this.pricePerGuest = obj.pricePerGuest;
            this.numberOfGuests = obj.numberOfGuests;
            this.minGuests = obj.minGuests;
            this.maxGuests = obj.maxGuests;
        }
    }

}