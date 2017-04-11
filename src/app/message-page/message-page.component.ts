import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../providers/af";
import { Router } from "@angular/router";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit, AfterViewChecked {
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
  
  constructor(public afService: AF, private router: Router) {
    this.messages = this.afService.messages;
  }
  
  ngOnInit() {}

  isYou(email) {
    if(email == this.afService.email)
      return true;
    else
      return false;
  }
  
  isMe(email) {
    if(email == this.afService.email)
      return false;
    else
      return true;
  }

  sendMessage(){
    this.afService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  goToHomePage($event) {
    $event.preventDefault();
    this.router.navigate(['']);
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { console.log('Scroll to bottom failed yo!') }
  }
  
}
