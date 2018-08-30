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

    /*interface UserData {
      login: string;
      bio: string;
      company: string;
    }
    this.http.get<UserData>('https://api.github.com/users/seeschweiler').subscribe(data => {
      console.log("User Login: " + data.login);
      console.log("Bio: " + data.bio);
      console.log("Company: " + data.company);
    });*/


    console.log(localStorage);

    if (!localStorage.username || !localStorage.email){
      alert("You are not logged in!")
      this.router.navigateByUrl('');
    }

    if (localStorage.role != "superAdmin" && localStorage.role != "groupAdmin"){
      alert("You do not have administrative privileges to access this!")
      this.router.navigateByUrl('/chat');
    }

    /*var text = '{ "name":"John", "birth":"1986-12-14", "city":"New York"}';
    var obj = JSON.parse(text);
    obj.birth = new Date(obj.birth);

    document.getElementById("demo").innerHTML = obj.name + ", " + obj.birth;*/
  }

  public createUser() {
    event.preventDefault();
    if (this.username === "" || this.email === "" || this.role === ""){
      alert("All fields must not be blank!");
    }else{
      const req = this.http.post('http://localhost:3000/api/reg?', {
            username: this.username,
            email: this.email,
            role: this.role
          })
            .subscribe(
              res => {
                console.log(res);
              },
              err => {
                alert('')
                console.log("Error occured");
              }
            );
    }
  }
}

  /*sendToAPI(){
      let formObj = this.form.getRawValue(); // {name: '', description: ''}

      let serializedForm = JSON.stringify(formObj);

      this.http.post("localhost:3000", serializedForm)
          .subscribe(
              data => console.log("success!", data),
              error => console.error("couldn't post because", error)
          );
  }*/
