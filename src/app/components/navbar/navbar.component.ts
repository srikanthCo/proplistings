import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public flashMessages: FlashMessagesService, public authService: AuthService) {
    this.user = afAuth.authState;
  }

  // login() {
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     console.log("result",result)
  //     // ...
  //   }).catch(function(error) {
  //     // Handle Errors here.
  //     // var errorCode = error.code;
  //     // var errorMessage = error.message;
  //     // // The email of the user's account used.
  //     // var email = error.email;
  //     // // The firebase.auth.AuthCredential type that was used.
  //     // var credential = error.credential;
  //     // ...
  //     console.log("error",error)
  //   });
  // }

  logout() {
    console.log("signing out")
    this.authService.signOut();
    this.flashMessages.show("You are Logged out!",{cssClass:'alert-success',timeout:3000});
  }

  ngOnInit() {
  }

}
