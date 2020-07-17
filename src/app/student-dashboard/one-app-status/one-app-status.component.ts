import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-one-app-status',
  templateUrl: './one-app-status.component.html',
  styleUrls: ['./one-app-status.component.scss']
})
export class OneAppStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.statusProgramPer').circleProgress({
      startAngle: -90
      , thickness: 15
      , value: 0.6
      , fill: {
          gradient: ['#ee30c2', '#6090e9'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
  , });
  }

}
