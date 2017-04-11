import { Component } from '@angular/core';
import { AF } from "./providers/af";
import { Router } from "@angular/router";
import { StateService } from './services/state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StateService]
})
export class AppComponent {
  private nliRoutes = ['/login','/register'];

  constructor(public afService: AF, private router: Router, private StateService: StateService) {
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          if(this.nliRoutes.includes(this.router.url)) {
            this.router.navigate([this.router.url]);
          } else {
            this.router.navigate(['login']);
          }
        }
        else {
          let link = null;
          if (!this.nliRoutes.includes(this.router.url)) {
            link = this.router.url;
          } else {
            link = '/';
          }
          this.afService.getUserWithUid(auth.uid).then(user => {
            
            // create user if none
            if (!user.email) {
              this.afService.saveUserInfo(auth.uid, auth.auth.displayName, auth.auth.email).then(_ => {
                this.afService.getUserWithUid(auth.uid).then(users => {
                  this.StateService.user = user;
                  if(auth.google) {
                    this.afService.displayName = auth.google.displayName;
                    this.afService.email = auth.google.email;
                    this.afService.uid = auth.uid;
                  }
                  else {
                    this.afService.displayName = user.name;
                    this.afService.email = user.email;
                    this.afService.uid = auth.uid;
                  }
                  
                  // Send them to the homepage if they are logged in
                  this.router.navigate([link]);
                });
              })
            } else {
              this.StateService.user = user;
              if(auth.google) {
                this.afService.displayName = auth.google.displayName;
                this.afService.email = auth.google.email;
                this.afService.uid = auth.uid;
              }
              else {
                this.afService.displayName = user.name;
                this.afService.email = user.email;
                this.afService.uid = auth.uid;
              }
              
              // Send them to the homepage if they are logged in
              this.router.navigate([link]);
            }
          });
        }
      }
    );
  }
}
