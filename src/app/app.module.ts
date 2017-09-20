import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

import {FirebaseService} from '../app/services/firebase.service';
import {AuthService} from '../app/services/auth.service';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddSubcategoryComponent } from './components/add-subcategory/add-subcategory.component';

const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'listings', component:ListingsComponent},
  {path:'listing/:id', component:ListingComponent},
  {path:'addlisting', component:AddListingComponent},
  {path:'editlisting/:id', component:EditListingComponent},
  {path:'login', component:LogInComponent},
  {path:'signup', component:SignUpComponent},
  {path:'categories', component:CategoriesComponent},
  {path:'addcategory', component:AddCategoryComponent},
  {path:'addsubcategory', component:AddSubcategoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    SignUpComponent,
    LogInComponent,
    CategoriesComponent,
    AddCategoryComponent,
    AddSubcategoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FlashMessagesModule,
    FormsModule,
  ],
  providers: [FirebaseService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
