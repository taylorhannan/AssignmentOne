import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var text = '{ "name":"John", "birth":"1986-12-14", "city":"New York"}';
    var obj = JSON.parse(text);
    obj.birth = new Date(obj.birth);

    document.getElementById("demo").innerHTML = obj.name + ", " + obj.birth;


  }

}
