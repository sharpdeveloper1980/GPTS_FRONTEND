import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-scholarship-status',
  templateUrl: './scholarship-status.component.html',
  styleUrls: ['./scholarship-status.component.scss']
})
export class ScholarshipStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.statusProgramPer').circleProgress({
      startAngle: -90
      , thickness: 15
      , value: 0.6
      , fill: {
        gradient: ['#ee30c2', '#6090e9'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
  }

}
