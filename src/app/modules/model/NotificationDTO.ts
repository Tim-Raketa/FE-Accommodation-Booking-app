export class NotificationDTO {
  public id:number=0;
  public username:string='';
  public title:string='';
  public message:string='';
  public opened:boolean=false;
  public constructor(obj?: any) {
    if (obj) {
      this.username = obj.username;
      this.id = obj.id;
      this.message = obj.message;
      this.title = obj.title;
      this.opened = obj.opened;
    }
  }
}
