import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AF } from "./providers/af";
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {RouterModule, Routes} from "@angular/router";
import { MessagePageComponent } from './message-page/message-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SelectModule } from 'ng2-select'
import { TeamSelectorComponent } from './common/team-selector/team-selector.component';
import { AdminPoolListComponent } from './admin-page/admin-pool-list/admin-pool-list.component';
import { AdminPoolCreatePageComponent } from './admin-page/admin-pool-create-page/admin-pool-create-page.component';
import { HomePoolPageComponent } from './home-page/home-pool-page/home-pool-page.component';
import { HomePoolOverviewComponent } from './home-page/home-pool-page/home-pool-overview/home-pool-overview.component';
import { HomePoolDayComponent } from './home-page/home-pool-page/home-pool-day/home-pool-day.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDWEzOiQYr0Xia7LkUuoi-aNQRSlzq7ZYw",
  authDomain: "the-madness.firebaseapp.com",
  databaseURL: "https://the-madness.firebaseio.com",
  storageBucket: "the-madness.appspot.com",
  messagingSenderId: "70084855294"
};

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent},
  { path: 'message', component: MessagePageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'admin/create-pool', component: AdminPoolCreatePageComponent },
  { path: 'admin/pools/:id', component: MessagePageComponent },
  { path: 'pools/:id', component: HomePoolPageComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    FormsModule,
    SelectModule
  ],
  declarations: [ 
    AppComponent, 
    LoginPageComponent, 
    HomePageComponent, 
    MessagePageComponent, 
    RegistrationPageComponent, 
    AdminPageComponent, 
    TeamSelectorComponent, 
    AdminPoolListComponent, AdminPoolCreatePageComponent, HomePoolPageComponent, HomePoolOverviewComponent, HomePoolDayComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [AF]
})
export class AppModule {}
