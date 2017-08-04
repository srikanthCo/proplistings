import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../app/services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  id:any;
  listing:any;
  imageUrl:any;
  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebase.getListingDetails(this.id).subscribe(listing => {
      this.listing=listing;
      console.log(listing);
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(this.listing.path).getDownloadURL().then((url)=>{
        this.imageUrl = url;
      }).catch((Error)=>{
        console.log(Error);
      });
    });
  }

  onDelete() {
    this.firebase.deleteListing(this.id);

    this.router.navigate(['/listings']);
  }

}
