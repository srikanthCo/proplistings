import { Component } from '@angular/core';
import {FirebaseService} from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  categories: any = null;
  constructor(private fservice:FirebaseService){
    this.fservice.getCategories().subscribe((cat) => {
      this.categories = cat;
      console.log("categories",this.categories)
      // for(let i=0;i<this.categories.length;i++){
      //   var menu = {
      //     cname: this.categories[i].c_name,
      //     id: this.categories[i].$key,
      //     subcat: [
      //       {
      //         name: "oil",
      //         usage: "fry"
      //       },
      //       {
      //         name: "drinks",
      //         usage:"party"
      //       }
      //     ]
      //   }
      //   console.log("menu",menu)
      //   this.fservice.addMainMenu(menu);
      // }
    });
  }

  update(id){
    console.log("id",id)
    var subcat= [{
      id: id
    }]
    this.fservice.addMainMenu(subcat);
  }
}
