import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../../app/services/firebase.service"

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any =null;
  subcat: any=null;
  visible: boolean = false;
  constructor(private fservice: FirebaseService) {
    this.fservice.getCategories().subscribe((cat) => {
      this.categories=cat;
    })
   }

  ngOnInit() {
  }

  show(index) {
    this.subcat = this.categories[index].subcat;
    var result = [];
    for(var i in this.subcat)
      result.push( this.subcat [i]);

    this.subcat = result;
    console.log("subcat",this.categories[index].subcat);
    this.visible = true;
  }

}
