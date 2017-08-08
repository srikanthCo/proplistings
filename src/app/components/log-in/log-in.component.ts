import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

   email:string;
   password:string;
   validate:boolean;
   authStates: any = null;
   user: Observable<firebase.User>;

  constructor(
              public afAuth: AngularFireAuth,
              public flashMessages: FlashMessagesService,
              public router: Router,
              public authservice: AuthService
            ) {
    this.user = afAuth.authState;
    this.afAuth.authState.subscribe((auth) => {
      this.authStates = auth;
      if (this.authStates) {
        // User is signed in.
        console.log("signed In")
        this.router.navigate(['']);

      }
    });
    
  }
  checkPassword() {
    if(!this.password && !this.email) {
      this.validate = true;
    } else {
      this.validate = false;
    }
    console.log("validate",this.validate)
  }

  login() {
    this.authservice.emailLogin(this.email, this.password).then(function(result){
      console.log("result",result)
    }).catch(function(error){
      console.log("error",error)
    });
    
  }

  ngOnInit() {
    this.validate = true;      
  }

}
