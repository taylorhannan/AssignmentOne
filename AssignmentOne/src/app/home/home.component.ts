import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	username: string = '';
	email: string = '';
	role: string = '';

	constructor(private router: Router, private http: HttpClient) {}

	ngOnInit() {
    // Checks if user is already logged in or not
		console.log(sessionStorage);
		if (sessionStorage.getItem("username") != null) {
			alert("You are already logged in!")
			this.router.navigateByUrl('/chat');
		}
	}

	public onSignin(): void {
		// Logs user to sessionStorage, ensures all fields are error-free & routes to /chat.
		event.preventDefault();
		if (this.username === "" && this.email === "") {
			alert("You must enter an email and a username!");
			return;
		} else if (typeof(Storage) !== "undefined") {
			const req = this.http.post('http://localhost:3000/api/auth', {
					username: this.username,
					email: this.email,
				})
				.subscribe((data: any) => {
						if (data.success) {
							alert("Login Successful!");
							this.router.navigateByUrl('/chat');
							sessionStorage.setItem("username", data.username);
							sessionStorage.setItem("email", data.email);
							sessionStorage.setItem("role", data.role);
						} else {
							alert('Username/Email incorrect!')
						}
					},
					err => {
						alert('An error has occured trying to create user.')
						console.log("Error occured");
						return;
					});
		} else {
			console.log('Local Storage Undefined');
			alert("Error: Local Storage Undefined!")
			return;
		}
	}
}
