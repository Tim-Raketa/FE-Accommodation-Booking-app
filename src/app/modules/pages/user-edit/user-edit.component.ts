import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { registerUserDTO } from '../../model/registerUserDTO';
import { passwordMatch } from '../../custom-validators/passwordMatch';
import { editUserDTO } from '../../model/editUserDTO';
import { UserEditService } from './user-edit.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userId: any
  cancelCountt: any
  prominent: any
  types:any="";
  userIds=[6]
  hostIds=[1,2,3,4,5]

  notificationTypes=[
    {id:1,select:false,name:"ReservationReq"},
    {id:2,select:false,name:"ReservationCancel"},
    {id:3,select:false,name:"AccommodationGrade"},
    {id:4,select:false,name:"HostGrade"},
    {id:5,select:false,name:"ProminentStatus"},
    {id:6,select:false,name:"ReservationResponse"}
  ]

  editUserForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    residency: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+$')])
  }, [passwordMatch("password", "confirmPassword")])

  constructor(private router: Router, private authService : AuthService, private service: UserEditService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("token");
    this.authService.getLoggedInUser().subscribe(res => {
      this.cancelCountt = res.cancelCount;
      this.prominent = res.prominent;
      this.editUserForm.patchValue({
        username: res.username,
        password: res.password,
        confirmPassword: res.password,
        name: res.name,
        surname: res.surname,
        email: res.email,
        residency: res.residency
      })
      let notiftypes=res.notificationTypes;
      var splitted = notiftypes.split(",", 10);
      this.notificationTypes.forEach(notif=>
      {
        if(splitted.includes(notif.name))
          notif.select=true;
      })
      var newTypes:any[]=[];
      this.notificationTypes.forEach(type=>{
        if(res.type=="GUEST"){
          if(this.userIds.includes(type.id))
            newTypes.push(type)
        }
        else if(this.hostIds.includes(type.id))
          newTypes.push(type)

      })
      this.notificationTypes=newTypes;
    })

  }

  get username(){
    return this.editUserForm.get('username');
  }

  get email(){
    return this.editUserForm.get('email');
  }

  get password(){
    return this.editUserForm.get('password');
  }

  get confirmPassword(){
    return this.editUserForm.get('confirmPassword');
  }

  get name(){
    return this.editUserForm.get('name');
  }

  get surname(){
    return this.editUserForm.get('surname');
  }

  get residency(){
    return this.editUserForm.get('residency');
  }

  goToHome =  () => {
    if(localStorage.getItem('role') == "HOST"){
      this.router.navigateByUrl('/host');
    } else if (localStorage.getItem('role') == "GUEST"){
      this.router.navigateByUrl('/guest');
    }

  };

  editUser =  () => {
    let username = this.editUserForm.get("username")?.value
    let password = this.editUserForm.get("password")?.value
    let name = this.editUserForm.get("name")?.value
    let surname = this.editUserForm.get("surname")?.value
    let email = this.editUserForm.get("email")?.value
    let residency = this.editUserForm.get("residency")?.value
    let type = localStorage.getItem("role");
    let oldUsername = localStorage.getItem("token");
    let types=this.types;
    let user: editUserDTO = {
      username: username ? username : '',
      password: password ? password : '',
      name: name ? name : '',
      surname: surname ? surname : '',
      email: email ? email : '',
      residency: residency ? residency : '',
      type: type ? type : '',
      oldUsername: oldUsername ? oldUsername : '',
      cancelCount: this.cancelCountt,
      prominent: this.prominent,
      notificationTypes: types ? types : ''
    }
    console.log(user);
    this.service.editUser(user).subscribe(res => {
      console.log(res);
      if (res.accessToken === '') {
      alert("Username already exists. Try another.");
      } else {
      alert("Successfully edited your profile.");
      localStorage.setItem("token", user.username);
      this.goToHome();
      }
    }, error =>
    {
      console.log(error)
    })

  };

  logout() {
    this.authService.logout();
  }

   deleteUser =  () => {
    this.service.deleteUser(this.userId).subscribe(res =>{
      if(res == true){
        alert("Successfully deleted your account.")
        setTimeout( () => { this.logout() }, 1500 );
      } else {
        alert("You cannot delete your account. You have active reservations in the future.")
      }
    })
   }

  onChangeNotificationTypes($event: Event) {
    // @ts-ignore
    const id=$event.target.value;
    // @ts-ignore
    const isChecked=$event.target.checked;

    this.notificationTypes = this.notificationTypes.map((d)=>{
      if(d.id==id){
        d.select=isChecked;
        return d;
      }
      return d;
    })
    this.types=""
    for(var bonus of this.notificationTypes){
      if(bonus.select)
      this.types += bonus.name + ","
    }
  }
}
