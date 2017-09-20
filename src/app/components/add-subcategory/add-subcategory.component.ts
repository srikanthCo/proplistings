import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../app/services/firebase.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../app/services/auth.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {

  sname:any;
  usage:any;
  userId:any;
  categories:any;
  category:any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private authservice: AuthService
  ) { 
    this.userId = this.authservice.currentUserId;
    console.log("user",this.userId);
    this.firebaseService.getCategories().subscribe((cat) => {
      this.categories=cat;
    })
  }

  ngOnInit() {
  }

  check(){
    console.log("hi")
  }

  onAddSubmit(){
    let listing = {
      sname: this.sname,
      usage: this.usage,
      category: this.categories[this.category].cname,
      cid: this.categories[this.category].$key
    }
    console.log("listing",listing)

    this.firebaseService.addSubCategory(listing);
  }

}
