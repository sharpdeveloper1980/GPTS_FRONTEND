import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {
  model: NgbDateStruct;
  date: {year: number, month: number};
  displayMonths = 1;
  selectedMonth: any;
  selectedDate: any;
  selectedYear: any;
  showSelectedDate: boolean = false;
  today = this.calendar.getToday();
  constructor(private calendar: NgbCalendar, public ngbDatepickerI18n: NgbDatepickerI18n) { }

  ngOnInit() {
  }
  getClickedDay(date){
    this.selectedMonth = this.ngbDatepickerI18n.getMonthFullName(date.month);
    this.selectedDate = date.day;
    this.selectedYear = date.year; 
    this.showSelectedDate = true;
  }
}
