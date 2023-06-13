export class GradeDTO {
  public username:string='';
  public accommodationId: number = 1;
  public grade: number = 1;
  public timeStamp: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.username = obj.username;
      this.accommodationId = obj.accommodationId;
      this.grade = obj.grade;
      this.timeStamp = obj.timeStamp;
    }
  }

}
