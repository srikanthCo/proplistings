import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../app/services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id;
  title;
  owner;
  city;
  bedrooms;
  price;
  type;
  image;

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebase.getListingDetails(this.id).subscribe(listing => {
      this.title = listing.title;
      this.city = listing.city;
      this.owner = listing.owner;
      this.bedrooms =listing.bedrooms;
      this.price = listing.price;
      this.type = listing.type;
    })
  }

  onEditSubmit(){
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms:this.bedrooms,
      price: this.price,
      type: this.type
    }
    console.log("listing",listing)

    this.firebase.updateListing(this.id,listing);

    this.router.navigate(['listings']);
  }
 

}
