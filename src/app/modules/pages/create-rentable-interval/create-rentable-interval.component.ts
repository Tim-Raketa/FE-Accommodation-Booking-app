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

  createRentableIntervalForm = new FormGroup({
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    priceOfAccommodation: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$')]),
    pricePerGuest: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$')]),
    automaticAcceptance: new FormControl('', Validators.required),
  })

  constructor(private router: Router, private route: ActivatedRoute, private accommodationService: AccommodationService) { }

  get startTime() {
    return this.createRentableIntervalForm.get('startTime');
  }

  get endTime() {
    return this.createRentableIntervalForm.get('endTime');
  }

  get priceOfAccommodation() {
    return this.createRentableIntervalForm.get('priceOfAccommodation');
  }

  get pricePerGuest() {
    return this.createRentableIntervalForm.get('pricePerGuest');
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
    let priceOfAccommodation = this.createRentableIntervalForm.get("priceOfAccommodation")?.value
    let pricePerGuest = this.createRentableIntervalForm.get("pricePerGuest")?.value
    let automaticAcceptance = this.createRentableIntervalForm.get("automaticAcceptance")?.value === 'true' ? true : false

    let rentableInterval: RentableIntervalDTO = {
      id: 0,
      accommodationId: this.accommodationID,
      startTime: startTime ? startTime : '',
      endTime: endTime ? endTime : '',
      priceOfAccommodation: Number(priceOfAccommodation),
      pricePerGuest: Number(pricePerGuest),
      automaticAcceptance: automaticAcceptance
    }

    console.log(rentableInterval)

    this.accommodationService.createRentableInterval(rentableInterval).subscribe(res =>{
        console.log(res);
        this.router.navigate(['host/accommodation', this.accommodationID]);
      }, error => 
      {
        console.log(error)
      }
    );

  };

}
