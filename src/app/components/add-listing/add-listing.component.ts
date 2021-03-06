import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../app/services/firebase.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../app/services/auth.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  title:any;
  owner:any;
  city:any;
  bedrooms:any;
  price:any;
  type:any;
  image:any;
  userId:any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private authservice: AuthService
  ) { 
    this.userId = this.authservice.currentUserId;
    console.log("user",this.userId);
  }

  ngOnInit() {
  }

  onAddSubmit(){
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms:this.bedrooms,
      price: this.price,
      type: this.type,
      userid: this.userId
    }
    console.log("listing",listing)

    this.firebaseService.addListing(listing);
  }

}
