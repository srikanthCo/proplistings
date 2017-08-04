import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email:string;
   password:string;
   confirmpassword:string;
   validate:boolean;
   authState: any = null;

   user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public flashMessages: FlashMessagesService, public router: Router) {
    this.user = afAuth.authState;
    this.authStatus();
  }
  checkPassword() {
    if(this.password == this.confirmpassword) {
      this.validate = false;
    } else {
      this.validate = true;
    }
    console.log("validate",this.validate)
  }

  authStatus() {
    this.afAuth.authState.subscribe((auth) => {
        this.authState = auth;
        console.log("user",this.authState)
        if (this.authState) {
          // User is signed in.
          console.log("signed In")
          this.router.navigate(['']);
        } else {
          // No user is signed in.
          console.log("Signed Out")
        }
      });
  }

  signup() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log("result",result)
       this.authStatus();
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
      console.log("error",error)
    });
  }

  ngOnInit() {
    this.validate = true;
  }

}
