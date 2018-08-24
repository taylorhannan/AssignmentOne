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
  constructor(private router: Router) { }

  ngOnInit() {
  }

public onSignin(): void {
  //event.preventDefault();
  if (typeof(Storage) !== "undefined"){
    localStorage.setItem("username", this.username);
    console.log(localStorage);
  }else{
    console.log('storage undefined yo');
  }
  this.router.navigateByUrl('/chat');
}

}
