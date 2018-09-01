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
  deletedUser: string;
  users:AdminComponent[] = [{"name":"super","email":"super@admin.com","role":"superAdmin"},{"name":"deluser1","email":"deluser@foobar.com","role":"user"},{"name":"deluser2","email":"deluser2@foobar.com","role":"user"},{"name":"deluser3","email":"deluser3@foobar.com","role":"user"}];

  ngOnInit(): void {
    if (!sessionStorage.username || !sessionStorage.email){
      alert("You are not logged in!")
      this.router.navigateByUrl('');
    }else if (sessionStorage.role != "superAdmin" && sessionStorage.role != "groupAdmin"){
      alert("You do not have administrative privileges to access this!")
      this.router.navigateByUrl('/chat');
    }

    const req = this.http.post('http://localhost:3000/api/users', {
      })
        .subscribe(data => {
            if (data) {
              console.log('data', data);
              //data.push(this.users);
              console.log('thisusers',this.users);
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

  public createUser() {
    // Function used to create user & post to backend API
    event.preventDefault();
    if (sessionStorage.role != "user"){
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

  public deleteUser(deletedUser) {
   // Deletes a user from the database
    if (sessionStorage.role == "superAdmin" ){
      if(deletedUser){
        event.preventDefault();
        console.log(deletedUser);
        const req = this.http.post('http://localhost:3000/api/del', {
            username: this.deletedUser
          })
          .subscribe((data: any) => {
            console.log(data);
            console.log(data.success);
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
          }else{
            alert("You did not select a user to delete!");
          }
    }else{
      alert("You do not have permission to delete users!")
      return;
    }
  }
}
