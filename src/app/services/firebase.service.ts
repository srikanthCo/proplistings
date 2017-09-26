import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';

@Injectable()
export class FirebaseService {

  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  folder:any;
  authState: any = null;
  userId: string;
  categories: FirebaseListObservable<any[]>;
  subcat: FirebaseListObservable<any[]>

  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth,private router:Router) {
    this.folder = 'listingimages';
    this.listings = this.db.list('/listings/') as FirebaseListObservable<Listing[]>;
    this.categories = this.db.list('/SideMenu') as FirebaseListObservable<Categories[]>;
   }
  getListings() {
    return this.listings;
  }

  getListingDetails(id){
    this.listing = this.db.object('/listings/'+id) as FirebaseObjectObservable<Listing>;
    return this.listing;
  }

  addMainMenu(maindata){
    // let path = `SideMenu/`+maindata.id+"/subcat/"; // Endpoint on firebase
    // delete maindata['id'];
    // console.log("path",path);
    // this.db.list(path).push(maindata)
    // .catch(error => console.log(error));
  }

  addCategory(category){
    this.categories.push(category).then(
      (data) => {
      console.log("data")
    });
  }

  addSubCategory(category){
    var path = category.path;
    this.subcat = this.db.list('/SideMenu/'+path) as FirebaseListObservable<Categories[]>;
    console.log("data",category,path)
    delete category['path'];
    setTimeout(()=>{
      this.subcat.push(category).then(
        (data) => {
        console.log("data")
      });
    },1000)
  }

  getCategories(){
    return this.categories;
  }

  addListing(listing){
    setTimeout(()=>{
      console.log("html",(<HTMLInputElement>document.getElementById('image')).files[0])
      // Create root ref
      let storageRef = firebase.storage().ref();
      for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
        console.log("selectedFile",selectedFile)
        let path = `/${this.folder}/${selectedFile.name}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          listing.image = selectedFile.name;
          listing.path = path;
          return this.listings.push(listing).then((value) => {
            this.router.navigate(['listings']);
          });
        });
      }
    },1000);
    console.log("html out",(<HTMLInputElement>document.getElementById('image')).files[0])
    
    
  }

  updateListing(id,listing) {
    return this.listings.update(id,listing)
  }

  deleteListing(id) {
    this.listings.remove(id);
  }
}

interface Listing{
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  city?:string;
  owner?:string;
  bedrooms?:string;
}

interface Categories{
  $key?:string;
  c_id?:string;
}