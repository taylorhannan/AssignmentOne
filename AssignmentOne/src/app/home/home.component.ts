import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:string = '';
  email:string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(localStorage);
    if (localStorage.getItem("username") != null){
      alert("You are already logged in!")
      this.router.navigateByUrl('/chat');
    }
  }

public onSignin(): void {
  // Logs user to LocalStorage, ensures all fields are error-free & routes to /chat.
  event.preventDefault();
  if (typeof(Storage) !== "undefined"){
    localStorage.setItem("username", this.username);
    localStorage.setItem("email", this.email);
    localStorage.setItem("role", "superAdmin")
    console.log(localStorage);
  }else{
    console.log('Local Storage Undefined');
    alert("Error: Local Storage Undefined!")
  }

  if (this.username != "" && this.email != ""){
    this.router.navigateByUrl('/chat');
  }else{
    alert("You must enter an email and a username!");
    localStorage.clear();
  }
}
}
