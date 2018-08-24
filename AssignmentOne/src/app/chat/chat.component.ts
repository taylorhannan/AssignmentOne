import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

messages=[];
message;
connection;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.connection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
      this.message="";
    });
  }

sendMessage(){
  let date = new Date();
  this.socketService.sendMessage(this.message + ' (insertUserName)' + ' Sent at '  + date.getHours() + ':' + date.getMinutes());
  this.message="";
}

}
