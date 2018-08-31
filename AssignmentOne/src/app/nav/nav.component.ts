import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  LoggedIn:boolean = true;
  constructor(private router: Router) { }
  ngOnInit() {
  }

  logout(){
    event.preventDefault();
    if (!localStorage.username || !localStorage.email){
      alert('You are already logged out!');
    }else{
      localStorage.clear();
      console.log(localStorage);
      alert('You are now logged out!');
      this.router.navigateByUrl('');
    }
  }
}
