import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.service';
import { RentableIntervalDTO } from '../../model/rentable-interval-dto.model';

@Component({
  selector: 'app-update-rentable-interval',
  templateUrl: './update-rentable-interval.component.html',
  styleUrls: ['./update-rentable-interval.component.css']
})
export class UpdateRentableIntervalComponent implements OnInit{
  rentableIntervalID: any
  accommodationID: any
  priceOfAccommodation: any
  pricePerGuest: any
  typeForPrice: any
  priceForPrice: any

  updateRentableIntervalForm = new FormGroup({
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    typeOfPrice: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$')]),
    automaticAcceptance: new FormControl('', Validators.required),
  })

  error:any={isError:false,errorMessage:''};
  isValidDate:any;

  constructor(private router: Router, private route: ActivatedRoute, private accommodationService: AccommodationService) { }

  get startTime() {
    return this.updateRentableIntervalForm.get('startTime');
  }

  get endTime() {
    return this.updateRentableIntervalForm.get('endTime');
  }

  get typeOfPrice(){
    return this.updateRentableIntervalForm.get('typeOfPrice');
  }

  get price(){
    return this.updateRentableIntervalForm.get('price');
  }

  get automaticAcceptance() {
    return this.updateRentableIntervalForm.get('automaticAcceptance');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.accommodationID = params['id']
      this.rentableIntervalID = params['idr']
      /*
      this.authService.getLoggedInUser().subscribe(res => {
      this.editUserForm.patchValue({
        username: res.username,
        password: res.password,
        confirmPassword: res.password,
        name: res.name,
        surname: res.surname,
        email: res.email,
        residency: res.residency
      })
    })
      */
      this.accommodationService.getRentableIntervalById(this.rentableIntervalID).subscribe(res =>{
        if(res.priceOfAccommodation == 0){
          this.typeForPrice = 'perGuest';
          this.priceForPrice = res.pricePerGuest;
        } else{
          this.typeForPrice = 'forAccommodation';
          this.priceForPrice = res.priceOfAccommodation;
        }
        this.updateRentableIntervalForm.patchValue({
          startTime: res.startTime,
          endTime: res.endTime,
          typeOfPrice: this.typeForPrice,
          price: this.priceForPrice,
          automaticAcceptance: String(res.automaticAcceptance),
        })
      })
    });
  }

  goBack = () => {
    this.router.navigate(['host/accommodation', this.accommodationID]);
  };

  updateRentableInterval = () => {
    let startTime = this.updateRentableIntervalForm.get("startTime")?.value
    let endTime = this.updateRentableIntervalForm.get("endTime")?.value

    console.log(startTime)
    console.log(typeof(startTime))
    console.log(endTime)
    console.log(typeof(endTime))

    let start = new Date(startTime + "T" + "00:00" + ":00");
    let end = new Date(endTime + "T" + "00:00" + ":00");

    this.isValidDate = this.validateDates(start, end);

    let typeOfPrice = this.updateRentableIntervalForm.get("typeOfPrice")?.value

    if(typeOfPrice === 'forAccommodation'){
      this.priceOfAccommodation = this.updateRentableIntervalForm.get("price")?.value
      this.pricePerGuest = 0;
    } else{
      this.priceOfAccommodation = 0;
      this.pricePerGuest = this.updateRentableIntervalForm.get("price")?.value;
    }

    let automaticAcceptance = this.updateRentableIntervalForm.get("automaticAcceptance")?.value === 'true' ? true : false

    let rentableInterval: RentableIntervalDTO = {
      id: this.rentableIntervalID,
      accommodationId: this.accommodationID,
      startTime: startTime ? startTime : '',
      endTime: endTime ? endTime : '',
      priceOfAccommodation: Number(this.priceOfAccommodation),
      pricePerGuest: Number(this.pricePerGuest),
      automaticAcceptance: automaticAcceptance
    }

    console.log(rentableInterval)


    if(this.isValidDate){
      this.accommodationService.updateRentableInterval(rentableInterval).subscribe(res =>{
        console.log(res);
        this.router.navigate(['host/accommodation', this.accommodationID]);
        }, error => 
        {
          console.log(error)
        }
      );
    }

    

  };

  validateDates(sDate: Date, eDate: Date){
    this.isValidDate = true;
  
    if((sDate != null && eDate !=null) && (eDate) <= (sDate)){
      this.error={isError:true,errorMessage:'End date should be greater than start date!'};
      this.isValidDate = false;
    }

    let today = new Date();
    if((sDate <= today) || (eDate <= today)){
      this.error={isError:true,errorMessage:'Cannot update interval in past!'};
      this.isValidDate = false;
    }

    return this.isValidDate;
  }
}
