import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	messages = [];
	message;
	connection;

	constructor(private socketService: SocketService, private router: Router) {}

	ngOnInit() {
    // Gets messages sent and subscribes to node.js socket server, checks for logged in user
		this.connection = this.socketService.getMessages().subscribe(message => {
			this.messages.push(message);
			this.message = "";
		});

		if (!sessionStorage.username || !sessionStorage.email) {
			sessionStorage.clear();
			alert("You are not logged in!")
			this.router.navigateByUrl('');
		}
	}

	sendMessage() {
		// Pushes message to socketService & logs datetime + user who sent the message.
		let date = new Date();
		let username = JSON.stringify(sessionStorage.username);
		//let usernamestr = username.replace(/\"/g, ""));
		if (this.message == null || this.message === "") {
			alert('You must enter a message to send something!');
		} else {
			this.socketService.sendMessage(this.message + ' (' + username + ') - Sent at ' + date.getHours() + ':' + date.getMinutes());
			this.message = "";
		}
	}
}
