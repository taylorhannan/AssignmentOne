import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {  }
  username:string = '';
  email:string = '';
  role:string = '';

  ngOnInit(): void {

    console.log(localStorage);

    if (!localStorage.username || !localStorage.email){
      alert("You are not logged in!")
      this.router.navigateByUrl('');
    }

    if (localStorage.role != "superAdmin" && localStorage.role != "groupAdmin"){
      alert("You do not have administrative privileges to access this!")
      this.router.navigateByUrl('/chat');
    }
  }

  public createUser() {
    // Function used to create user & post to backend API
    event.preventDefault();
    if (localStorage.role != "user"){
      if(this.username === "" || this.email === "" || this.role === ""){
        alert("All fields must not be blank!");
      }else{
        const req = this.http.post('http://localhost:3000/api/reg', {
            username: this.username,
            email: this.email,
            role: this.role
          })
            .subscribe((data: any) => {
                if (data.success) {
                  alert('User created successfully!');
                } else {
                  alert('Error!');
                  return;
                }
              },
              err => {
                alert('An error has occured trying to create user.')
                console.log("Error occured");
                return;
              });
            }
    }
  }

  public deleteUser() {
  // Deletes a user from the database
  event.preventDefault();
  const req = this.http.post('http://localhost:3000/api/reg', {
      username: "deluser1",
      email: "deluser@foobar.com",
      role: "user"
    })
    .subscribe((data: any) => {
        if (data.success) {
          alert('User deleted successfully!');
        } else {
          alert('Error!');
          return;
        }
      },
      err => {
        alert('An error has occured trying to create user.')
        console.log("Error occured");
        return;
      });
  }
}
