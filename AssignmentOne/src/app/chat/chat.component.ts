import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

messages=[];
message;
connection;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit() {
    this.connection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
      this.message="";
    });

/*    if (localStorage.username === ""){
      alert("Invalid Username!")
      this.router.navigateByUrl('');
    }*/
  }

sendMessage(){
  let date = new Date();
  let username = JSON.stringify(localStorage.username);
  let usernamestr = username.replace(/\"/g, ""));

  this.socketService.sendMessage(this.message + ' (' + usernamestr + ') - Sent at '  + date.getHours() + ':' + date.getMinutes());
  this.message="";
}
}
