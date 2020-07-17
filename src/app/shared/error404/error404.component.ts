import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.classList.add("errorfour-body");
  }

  ngOnDestroy() {
    document.body.classList.remove("errorfour-body");
  }

}
