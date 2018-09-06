import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	LoggedIn: boolean = true;
	constructor(private router: Router) {}
	ngOnInit() {}

	logout() {
    // Clears all storage and logs user out before returning to Home
		event.preventDefault();
		if (!sessionStorage.username || !sessionStorage.email) {
			alert('You are already logged out!');
		} else {
			sessionStorage.clear();
			console.log(sessionStorage);
			alert('You are now logged out!');
			this.router.navigateByUrl('');
		}
	}
}
