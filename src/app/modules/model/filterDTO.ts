export class filterDTO {
  startDate: string = '';
  endDate: string = '';
  location: string = '';
  numberOfGuests: number = 0;
  amenities:string='';
  minGrade :number= 0;
  maxGrade:number= 0;
  onlyHighlighted:boolean= false;

  public constructor(obj?: any) {
    if (obj) {
      this.startDate = obj.startDate;
      this.endDate = obj.endDate;
      this.location = obj.location;
      this.numberOfGuests = obj.numberOfGuests;
      this.amenities= obj.amenities;
      this.minGrade= obj.minGrade;
      this.maxGrade=obj.maxGrade;
      this.onlyHighlighted=obj.onlyHighlighted;
    }
  }

}
