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
  username:string = '';
  email:string = '';
  role:string = '';

  constructor(private router: Router, private http: HttpClient) { }

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
  if (this.username === "" && this.email === ""){
    alert("You must enter an email and a username!");
    return;
  }else if (typeof(Storage) !== "undefined"){
    const req = this.http.post('http://localhost:3000/api/auth', {
          username: this.username,
          email: this.email,
        })
          .subscribe(
            res => {
              if(res.success == true){
                console.log(res.success);
                alert('User logged in successfully!');
                localStorage.setItem("username", res.username);
                localStorage.setItem("email", res.email);
                localStorage.setItem("role", res.role)
                console.log(localStorage);
                this.router.navigateByUrl('/chat');
              }else{
                alert('Username or email incorrect!');
              }
            },
            err => {
              alert('An error has occured trying to create user.')
              console.log("Error occured");
              return;
            }
          );
  }else{
    console.log('Local Storage Undefined');
    alert("Error: Local Storage Undefined!")
    return;
  }
  }
}
