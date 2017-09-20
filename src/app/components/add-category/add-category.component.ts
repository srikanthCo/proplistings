import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../app/services/firebase.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../app/services/auth.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  cname:any;
  description:any;
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
      cname: this.cname,
      description: this.description
    }
    console.log("listing",listing)

    this.firebaseService.addCategory(listing);
  }
}





