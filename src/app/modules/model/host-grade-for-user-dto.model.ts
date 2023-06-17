export class HostGradeForUserDTO {
    public hostId: string='';
    public username: string='';
    public grade: number = 0;
    public timeStamp: string = '';
    public hostNameSurname: string = '';

    public constructor(obj?: any) {
        if (obj) {
            this.username = obj.username;
            this.hostId = obj.hostId;
            this.grade = obj.grade;
            this.timeStamp = obj.timeStamp;
            this.hostNameSurname = obj.hostNameSurname;
        }
    }
}
