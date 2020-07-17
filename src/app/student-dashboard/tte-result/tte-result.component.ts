import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivationEnd } from '@angular/router';

import { workstyleData } from './tte-result-data'

import { HeaderService } from '../../shared/services/header.service';
declare var $: any;

@Component({
  selector: 'app-tte-result',
  templateUrl: './tte-result.component.html',
  styleUrls: ['./tte-result.component.scss']
})
export class TteResultComponent implements OnInit, AfterViewInit {
  userDetails: any;
  resultVAr: boolean = false;
  userIdObj: any;
  occupationArray: Array<any> = [];
  normedFactors: Array<any> = [];
  pdfUrl: String = '';
  workstyleData: any = workstyleData;
  workstyle: any;
  scoresReady: boolean = false;
  careerDataVar: boolean = false;

  // slick data 
  careeerConfig: any;

  circleSlideConfig = {
    slidesPerView: 'auto',
    centeredSlides: false
  };

  constructor(public apiService: ApiService, public router: Router, public headerService: HeaderService) {
    this.headerService.loaderFunction(true);
  }

  ngOnInit() {
    // this.headerService.dashboardHomeObservable().subscribe(val => {
    //   if (!val) {
    //     this.router.navigate(['student-dashboard', 'student-profile']);
    //   }
    // });

    this.userDetails = JSON.parse(localStorage.getItem('userGpts'));
    
    this.userIdObj = {
      "user_id": this.userDetails.user_id
    }

    // this.getResult();

    this.apiService.ssoStatus(this.userIdObj).subscribe(val => {
      let status = val.data.status;
      console.log(status);
      if (status != 3) {
        console.log('working')
        this.router.navigate(['student-dashboard', 'TTE']);
      } else {
        this.getResult();
      }
    });

    this.workstyle = this.workstyleData.innovative;

    //this.workstyle = this.workstyleData.incisive;

    this.careeerConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 30,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
  }


  ngAfterViewInit() { }

  getResult() {
    this.apiService.getResult(this.userIdObj).subscribe(val => {
      // Career result
      let tempArray = val.data.assessments[0];
      let careerResultErr = tempArray.results.ranked_occupations;
      this.occupationArray = careerResultErr.slice(0, 5);
      //Normed factors
      let tempNormedFactors = tempArray.results.normed_factors;
      this.normedFactors = tempNormedFactors;
      console.log(this.normedFactors); 
      this.normedFactors.forEach(element => {
        element.value = element.value / 5;
      });
      this.scoresReady = true;

      setTimeout(() => {
        this.jqueryFunctions();
      }, 500);

      setTimeout(() => {
        this.careerDataVar = true;
        this.headerService.loaderFunction(false);
      }, 1000);
    });
    
    this.apiService.tteReport(this.userIdObj).subscribe(val => {
       if (val.data.status) {
         this.pdfUrl = val.data.url;
       }
    });
  }

  jqueryFunctions() {
    $('.second').circleProgress({
      startAngle: 90
      , thickness: 2
      , value: this.normedFactors[0].value
      , fill: {
        color: '#4e329b'
        //background: '#e9eafc'
        //gradient: ['#e9eafc', '#e9eafc'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
    $('.three').circleProgress({
      startAngle: 90
      , thickness: 2
      , value: this.normedFactors[1].value
      , fill: {
        color: '#cf35dc'
        //gradient: ['#f54ea2', '#ff7676'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
    $('.four').circleProgress({
      startAngle: 90
      , thickness: 2
      , value: this.normedFactors[2].value
      , fill: {
        color: '#854249'
        //gradient: ['#17ead9', '#6078ea'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
    $('.five').circleProgress({
      startAngle: 90
      , thickness: 2
      , value: this.normedFactors[3].value
      , fill: {
        color: '#42b7ba'
        //gradient: ['#622774', '#c53364'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
    $('.six').circleProgress({
      startAngle: 90
      , thickness: 2
      , value: this.normedFactors[4].value
      , fill: {
        color: '#36bfff'
        //gradient: ['#42e695', '#3bb2b8'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
    $('.seven').circleProgress({
      startAngle: 90
      , thickness: 2
      , value: this.normedFactors[5].value
      , fill: {
        color: '#e01a37'
        //gradient: ['#f02fc2', '#6094ea'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
    $('.eight').circleProgress({
      startAngle: 90
      , thickness: 2
      , value: this.normedFactors[6].value
      , fill: {
        color: '#40b6b9'
        //gradient: ['#184e68', '#57ca85'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
    $('.nine').circleProgress({
      startAngle: 90
      , thickness: 2
      , value: this.normedFactors[7].value
      , fill: {
        color: '#ff7a04'
        //gradient: ['#5b247a', '#1bcedf'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
      }
      ,
    });
  }

  workstyleInfo(workstyle: string, event) {
    $("input:radio.rd_btn").each(function(i) {
      $(this).attr('checked',false);
    });
    let triArray = document.querySelectorAll('.triangleOrange');
    // triArray.forEach(element => {
    //   element.classList.remove('show');
    // });
    for (let index = 0; index < triArray.length; index++) {
      const element = triArray[index];
      element.classList.remove('show');

    }
    this.workstyle = this.workstyleData[workstyle];
    let triElement = event.currentTarget.querySelector('.triangleOrange');
    triElement.classList.add('show');
  }
}
