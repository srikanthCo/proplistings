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
  subcategories: any = null;
  subname: any = null;
  subcategory: any[];
  subcount: any[];
  path : String = null;

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
    this.subcategories = {};
    this.subcategory = [];
  }

  check(){
    this.subcount = [];
    var result = [];
    this.path = this.categories[this.category].$key + "/subcat/";
    for(var i in this.categories[this.category].subcat)
    {
      this.categories[this.category].subcat[i].$key = i;
      result.push( this.categories[this.category].subcat [i]);
    }

    // this.subcategories[this.categories[this.category].cname] = result;
    this.subcount.push(result);
    this.subname = this.categories[this.category].cname;
  }

  sub(id) {

    var result = [];
    console.log("subcount",this.subcount,this.subcount[id][this.subcategory[id]].subcat,id,this.subcategory[id])
    for(var i in this.subcount[id][this.subcategory[id]].subcat)
    {
      this.subcount[id][this.subcategory[id]].subcat[i].$key = i;
      result.push( this.subcount[id][this.subcategory[id]].subcat [i]);
    }
    if(id === (this.subcount.length-1)){
      this.path = this.path + this.subcount[id][this.subcategory[id]].$key + "/subcat/";
      console.log("index",this.subcount[id][this.subcategory[id]],this.subcategory[id]);
      console.log("res",result,this.path);
      if(result.length > 0){
        this.subcount.push(result);
      }
    }
    
  }

  onAddSubmit(){
    let listing = {
      sname: this.sname,
      usage: this.usage,
      category: this.categories[this.category].cname,
      cid: this.categories[this.category].$key,
      path : this.path
    }

    this.firebaseService.addSubCategory(listing);
  }

}
