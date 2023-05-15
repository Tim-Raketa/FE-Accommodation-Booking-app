import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.service';
import { AccommodationDTO } from '../../model/accommodation-dto.model';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent implements OnInit{

  hostId: any

  createAccommodationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    location: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    perks: new FormControl('', Validators.required),
    minGuests: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$')]),
    maxGuests: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$')])
  })

  constructor(private router: Router, private accommodationService: AccommodationService) { }

  get name(){
    return this.createAccommodationForm.get('name');
  }

  get location(){
    return this.createAccommodationForm.get('location');
  }

  get perks(){
    return this.createAccommodationForm.get('perks');
  }

  get minGuests(){
    return this.createAccommodationForm.get('minGuests');
  }

  get maxGuests(){
    return this.createAccommodationForm.get('maxGuests');
  }

  ngOnInit(): void {
    this.hostId = localStorage.getItem("token");
  }

  goBack =  () => {
    this.router.navigateByUrl('/host');
  };

  createAccommodation =  () => {

    let name = this.createAccommodationForm.get("name")?.value
    let location = this.createAccommodationForm.get("location")?.value
    let perks = this.createAccommodationForm.get("perks")?.value
    let minGuests = this.createAccommodationForm.get("minGuests")?.value
    let maxGuests = this.createAccommodationForm.get("maxGuests")?.value

    let accommodation: AccommodationDTO = {
      id: 0,
      name: name ? name : '',
      location: location ? location : '',
      perks: perks ? perks : '',
      minGuests: Number(minGuests),
      maxGuests: Number(maxGuests),
      hostId: this.hostId,
    }

    console.log(accommodation);

    this.accommodationService.createAccommodation(accommodation).subscribe(res =>{
        console.log(res);
        this.router.navigateByUrl('/host');
      }, error => 
      {
        console.log(error)
      }
    );

  };

}
