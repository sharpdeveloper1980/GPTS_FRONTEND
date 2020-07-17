import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.classList.add("studentsp-body");
  }

  ngOnDestroy() {
    document.body.classList.remove("studentsp-body");
  }

}
