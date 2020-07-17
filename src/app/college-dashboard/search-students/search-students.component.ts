import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-students',
  templateUrl: './search-students.component.html',
  styleUrls: ['./search-students.component.scss']
})
export class SearchStudentsComponent implements OnInit {

  minValue: number = 0;
  maxValue: number = 0;
  options:  {
    floor: 0,
    ceil: 100,
    step: 1
  };
  userTypeList: Array<any>;

  constructor() { }

  ngOnInit() {
    this.userTypeList = [
      { 'id': 1, 'name': 'Student' },
      { 'id': 2, 'name': 'Institute' },
      { 'id': 3, 'name': 'School' }]

      document.body.classList.add("search-student-body");

  }

  ngOnDestroy() {
    document.body.classList.remove("search-student-body");
  }

  advanceSearch() {
    // setTimeout(() => {
    //   this.minValue = 0;
    //   this.maxValue = 0;
    //   this.options = {
    //     floor: 0,
    //     ceil: 100,
    //     step: 5
    //   };
    // }, 100)

  }

}
