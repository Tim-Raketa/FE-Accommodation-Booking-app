import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RentableIntervalDTO } from '../../model/rentable-interval-dto.model';

@Component({
  selector: 'app-create-rentable-interval',
  templateUrl: './create-rentable-interval.component.html',
  styleUrls: ['./create-rentable-interval.component.css']
})
export class CreateRentableIntervalComponent implements OnInit {

  accommodationID: any
  priceOfAccommodation: any
  pricePerGuest: any

  createRentableIntervalForm = new FormGroup({
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
    return this.createRentableIntervalForm.get('startTime');
  }

  get endTime() {
    return this.createRentableIntervalForm.get('endTime');
  }

  get typeOfPrice(){
    return this.createRentableIntervalForm.get('typeOfPrice');
  }

  get price(){
    return this.createRentableIntervalForm.get('price');
  }

  get automaticAcceptance() {
    return this.createRentableIntervalForm.get('automaticAcceptance');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.accommodationID = params['id']
    });
  }

  goBack = () => {
    this.router.navigate(['host/accommodation', this.accommodationID]);
  };

  createRentableInterval = () => {
    let startTime = this.createRentableIntervalForm.get("startTime")?.value
    let endTime = this.createRentableIntervalForm.get("endTime")?.value

    console.log(startTime)
    console.log(typeof(startTime))
    console.log(endTime)
    console.log(typeof(endTime))

    let start = new Date(startTime + "T" + "00:00" + ":00");
    let end = new Date(endTime + "T" + "00:00" + ":00");

    this.isValidDate = this.validateDates(start, end);

    let typeOfPrice = this.createRentableIntervalForm.get("typeOfPrice")?.value

    if(typeOfPrice === 'forAccommodation'){
      this.priceOfAccommodation = this.createRentableIntervalForm.get("price")?.value
      this.pricePerGuest = 0;
    } else{
      this.priceOfAccommodation = 0;
      this.pricePerGuest = this.createRentableIntervalForm.get("price")?.value;
    }

    let automaticAcceptance = this.createRentableIntervalForm.get("automaticAcceptance")?.value === 'true' ? true : false

    let rentableInterval: RentableIntervalDTO = {
      id: 0,
      accommodationId: this.accommodationID,
      startTime: startTime ? startTime : '',
      endTime: endTime ? endTime : '',
      priceOfAccommodation: Number(this.priceOfAccommodation),
      pricePerGuest: Number(this.pricePerGuest),
      automaticAcceptance: automaticAcceptance
    }

    console.log(rentableInterval)


    if(this.isValidDate){
      this.accommodationService.createRentableInterval(rentableInterval).subscribe(res =>{
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
      this.error={isError:true,errorMessage:'Cannot create interval in past!'};
      this.isValidDate = false;
    }

    return this.isValidDate;
  }

}
