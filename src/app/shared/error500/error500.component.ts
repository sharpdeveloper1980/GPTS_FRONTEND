import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.scss']
})
export class Error500Component implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.classList.add("errorfive-body");
  }
  ngOnDestroy() {
    document.body.classList.remove("errorfive-body");
  }
}
