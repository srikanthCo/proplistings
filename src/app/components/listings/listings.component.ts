import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../app/services/firebase.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listings:any[];
  constructor(private firebaseService: FirebaseService) { }
  ngOnInit() {
    this.firebaseService.getListings().subscribe(listings => {
      this.listings=listings;
      console.log(this.listings)
    })
    console.log("listing",this.listings)
    
  }

}
