import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  minValue: number = 0;
  maxValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1
  };
  model: NgbDateStruct;
  date: { year: number, month: number };
  displayMonths = 1;
  selectedMonth: any;
  selectedDate: any;
  selectedYear: any;
  showSelectedDate: boolean = false;
  today = this.calendar.getToday();
  items: any = [];
  advanceSearchVar: boolean = false;
  userTypeList: Array<any>;
  constructor(private calendar: NgbCalendar, public ngbDatepickerI18n: NgbDatepickerI18n) { }

  ngOnInit() {
    document.body.classList.add("collegeBody");
  }

  ngOnDestroy() {
    document.body.classList.remove("collegeBody");
  }
  advanceSearch() {
    this.advanceSearchVar = !this.advanceSearchVar;
    this.userTypeList = [
      { 'id': 1, 'name': 'Student' },
      { 'id': 2, 'name': 'Institute' },
      { 'id': 3, 'name': 'School' }]
  }

  getClickedDay(date) {
    this.selectedMonth = this.ngbDatepickerI18n.getMonthFullName(date.month);
    this.selectedDate = date.day;
    this.selectedYear = date.year;
    this.showSelectedDate = true;
  }
}
